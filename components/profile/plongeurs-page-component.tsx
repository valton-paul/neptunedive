import React, {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {AlertCircle, ArrowUpDown, CreditCard, GraduationCap, User} from 'lucide-react'
import {useCustomQuery} from "@/tanStackQuery/queryGenerator"
import {getAllPlongeurs} from "@/api/plongeurApi"
import {getLateFeedbacksAllEncadrant} from "@/api/commentairesAPI"
import {getLatePayement} from "@/api/paymentAPI"
import {useUser} from "@/lib/useUser"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Card, CardContent} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Checkbox} from "@/components/ui/checkbox"
import {Plongeur} from "@/types/Plongeur"
import {FeedBack} from "@/types/FeedBack"
import {NiveauPlongeeAutonome} from "@/types/NiveauPlongeeAutonome"
import {NiveauPlongeeEncadre} from "@/types/NiveauPlongeeEncadre"
import {NiveauMoniteur} from "@/types/NiveauMoniteur"

type SortConfig = {
    key: keyof Plongeur | null;
    direction: 'asc' | 'desc';
};

export default function PlongeursPageComponent() {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState('')
    const [isOnlyMoniteur, setIsOnlyMoniteur] = useState(false)
    const [isOnlyMoniteurFeedback, setIsOnlyMoniteurFeedback] = useState(false)
    const [isOnlyFormation, setIsOnlyFormation] = useState(false)
    const [isOnlyPayement, setIsOnlyPayement] = useState(false)
    const [selectedNiveauxMoniteur, setSelectedNiveauxMoniteur] = useState<NiveauMoniteur[]>([])
    const [selectedNiveauxEncadre, setSelectedNiveauxEncadre] = useState<NiveauPlongeeEncadre[]>([])
    const [selectedNiveauxAutonome, setSelectedNiveauxAutonome] = useState<NiveauPlongeeAutonome[]>([])
    const [sortConfig, setSortConfig] = useState<SortConfig>({key: null, direction: 'asc'})

    const {user, loading} = useUser()

    const {data: plongeurs = [], isLoading} = useCustomQuery<Plongeur[]>(
        ['plongeurs'],
        () => getAllPlongeurs()
    )

    const {data: lateFeedbacks = []} = useCustomQuery<FeedBack[]>(
        ['lateFeedbacks'],
        () => getLateFeedbacksAllEncadrant(),
        {enabled: (!loading && user?.roles.includes('ROLE_ADMIN'))}
    )

    const {data: latePayement = []} = useCustomQuery<Plongeur[]>(
        ['latePayement'],
        () => getLatePayement(),
        {enabled: (!loading && user?.roles.includes('ROLE_ADMIN'))}
    )

    const [filteredPlongeurs, setFilteredPlongeurs] = useState<Plongeur[]>([])

    useEffect(() => {
        if (!isLoading) {
            let filtered = plongeurs
            if (isOnlyMoniteur) filtered = filtered.filter(plongeur => plongeur.isMoniteur)
            if (isOnlyMoniteurFeedback) filtered = filtered.filter(plongeur => lateFeedbacks.some(feedback => parseInt(feedback.encadrant_id) === plongeur.id))
            if (isOnlyFormation) filtered = filtered.filter(plongeur => plongeur.formation)
            if (isOnlyPayement) filtered = filtered.filter(plongeur => latePayement.some(payement => payement.id === plongeur.id))
            if (selectedNiveauxMoniteur.length > 0) filtered = filtered.filter(plongeur => plongeur.niveauMoniteur && selectedNiveauxMoniteur.includes(plongeur.niveauMoniteur))
            if (selectedNiveauxEncadre.length > 0) filtered = filtered.filter(plongeur => plongeur.niveauPlongeeEncadre && selectedNiveauxEncadre.includes(plongeur.niveauPlongeeEncadre))
            if (selectedNiveauxAutonome.length > 0) filtered = filtered.filter(plongeur => plongeur.niveauPlongeeAutonome && selectedNiveauxAutonome.includes(plongeur.niveauPlongeeAutonome))

            filtered = filtered.filter(plongeur =>
                plongeur.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                plongeur.prenom?.toLowerCase().includes(searchTerm.toLowerCase())
            )

            if (sortConfig.key) {
                filtered.sort((a, b) => {
                    if (a[sortConfig.key!] < b[sortConfig.key!]) return sortConfig.direction === 'asc' ? -1 : 1
                    if (a[sortConfig.key!] > b[sortConfig.key!]) return sortConfig.direction === 'asc' ? 1 : -1
                    return 0
                })
            }

            setFilteredPlongeurs(filtered)
        }
    }, [isLoading, plongeurs, searchTerm, isOnlyMoniteur, isOnlyMoniteurFeedback, isOnlyFormation, isOnlyPayement, selectedNiveauxMoniteur, selectedNiveauxEncadre, selectedNiveauxAutonome, lateFeedbacks, latePayement, sortConfig])

    const isLatePayers = (id: number) => latePayement.some(payement => payement.id === id)

    const redirect = (id: number) => router.push(`/plongeurs/${id}`)

    const resetFilters = () => {
        setSearchTerm('')
        setIsOnlyMoniteur(false)
        setIsOnlyMoniteurFeedback(false)
        setIsOnlyFormation(false)
        setIsOnlyPayement(false)
        setSelectedNiveauxMoniteur([])
        setSelectedNiveauxEncadre([])
        setSelectedNiveauxAutonome([])
        setSortConfig({key: null, direction: 'asc'})
    }

    const handleSort = (key: keyof Plongeur) => {
        setSortConfig(current => {
            if (current.key === key) {
                return {...current, direction: current.direction === 'asc' ? 'desc' : 'asc'}
            }
            return {key, direction: 'asc'}
        })
    }

    return (
        <div className="container mx-auto p-4 bg-background min-h-screen">
            <h1 className="text-3xl font-bold text-center text-foreground mb-6">Liste des Plongeurs</h1>

            <Card className="mb-6">
                <CardContent className="p-6">
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <Input
                                type="text"
                                placeholder="Rechercher un plongeur..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="max-w-sm"
                            />
                            <Button onClick={resetFilters}>Réinitialiser les filtres</Button>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="moniteur"
                                    checked={isOnlyMoniteur}
                                    onChange={(e) => setIsOnlyMoniteur(e.target.checked)}
                                />
                                <Label htmlFor="moniteur">Moniteur</Label>
                            </div>
                            {user?.roles.includes('ROLE_ADMIN') && (
                                <>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="moniteurFeedback"
                                            checked={isOnlyMoniteurFeedback}
                                            onChange={(e) => setIsOnlyMoniteurFeedback(e.target.checked)}
                                        />
                                        <Label htmlFor="moniteurFeedback" className="flex items-center">
                                            Fiche de suivi
                                            <AlertCircle className="ml-2 h-4 w-4 text-orange-500"/>
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="checkPaiement"
                                            checked={isOnlyPayement}
                                            onChange={(e) => setIsOnlyPayement(e.target.checked)}
                                        />
                                        <Label htmlFor="checkPaiement" className="flex items-center">
                                            Attente de paiement
                                            <CreditCard className="ml-2 h-4 w-4 text-red-500"/>
                                        </Label>
                                    </div>
                                </>
                            )}
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="checkFormation"
                                    checked={isOnlyFormation}
                                    onChange={(e) => setIsOnlyFormation(e.target.checked)}
                                />
                                <Label htmlFor="checkFormation" className="flex items-center">
                                    En formation
                                    <GraduationCap
                                        className="ml-2 h-4 w-4 bg-primary text-primary-foreground p-1 rounded-full"/>
                                </Label>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Filtres par niveau</h3>
                            <div className="flex flex-wrap gap-4">
                                <div>
                                    <Label className="font-semibold mb-1 block">Niveau Moniteur</Label>
                                    <div className="flex gap-2 flex-wrap">
                                        {["NONE", "E1", "E2", "E3", "E4"].map((niveau) => (
                                            <Badge
                                                key={niveau}
                                                variant={selectedNiveauxMoniteur.includes(niveau as NiveauMoniteur) ? "default" : "outline"}
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    setSelectedNiveauxMoniteur(prev =>
                                                        prev.includes(niveau as NiveauMoniteur)
                                                            ? prev.filter(n => n !== niveau)
                                                            : [...prev, niveau as NiveauMoniteur]
                                                    )
                                                }}
                                            >
                                                {niveau}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Label className="font-semibold mb-1 block">Niveau Plongée Encadrée</Label>
                                    <div className="flex gap-2 flex-wrap">
                                        {[12, 20, 40, 60].map((niveau) => (
                                            <Badge
                                                key={niveau}
                                                variant={selectedNiveauxEncadre.includes(niveau as NiveauPlongeeEncadre) ? "default" : "outline"}
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    setSelectedNiveauxEncadre(prev =>
                                                        prev.includes(niveau as NiveauPlongeeEncadre)
                                                            ? prev.filter(n => n !== niveau)
                                                            : [...prev, niveau as NiveauPlongeeEncadre]
                                                    )
                                                }}
                                            >
                                                PE{niveau}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Label className="font-semibold mb-1 block">Niveau Plongée Autonome</Label>
                                    <div className="flex gap-2 flex-wrap">
                                        {[20, 40, 60].map((niveau) => (
                                            <Badge
                                                key={niveau}
                                                variant={selectedNiveauxAutonome.includes(niveau as NiveauPlongeeAutonome) ? "default" : "outline"}
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    setSelectedNiveauxAutonome(prev =>
                                                        prev.includes(niveau as NiveauPlongeeAutonome)
                                                            ? prev.filter(n => n !== niveau)
                                                            : [...prev, niveau as NiveauPlongeeAutonome]
                                                    )
                                                }}
                                            >
                                                PA{niveau}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="w-full overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]"></TableHead>
                            <TableHead>
                                <Button variant="ghost" onClick={() => handleSort('nom')}>
                                    Nom <ArrowUpDown className="ml-2 h-4 w-4"/>
                                </Button>
                            </TableHead>
                            <TableHead>
                                Niveau
                            </TableHead>
                            <TableHead>Moniteur</TableHead>
                            <TableHead>Paiement</TableHead>
                            <TableHead>Fiche de suivi</TableHead>
                            <TableHead>Formation</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPlongeurs.map((plongeur) => (
                            <TableRow
                                key={plongeur.id}
                                className="cursor-pointer hover:bg-muted/50"
                                onClick={() => redirect(plongeur.id)}
                            >
                                <TableCell>
                                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                        <User className="h-6 w-6 text-primary-foreground"/>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <p className="font-medium">{`${plongeur.prenom} ${plongeur.nom}`}</p>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {plongeur.niveauMoniteur !== "NONE" && (
                                            <Badge variant="outline">{plongeur.niveauMoniteur}</Badge>
                                        )}
                                        {plongeur.niveauPlongeeEncadre && (
                                            <Badge variant="outline">PE{plongeur.niveauPlongeeEncadre}</Badge>
                                        )}
                                        {plongeur.niveauPlongeeAutonome && (
                                            <Badge variant="outline">PA{plongeur.niveauPlongeeAutonome}</Badge>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {plongeur.isMoniteur && <Badge>Oui</Badge>}
                                </TableCell>
                                <TableCell>
                                    {isLatePayers(plongeur.id) && <CreditCard className="h-4 w-4 text-red-500"/>}
                                </TableCell>
                                <TableCell>
                                    {lateFeedbacks.some(feedback => parseInt(feedback.encadrant_id) === plongeur.id) && (
                                        <AlertCircle className="h-4 w-4 text-orange-500"/>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {plongeur.formation && <Badge variant="secondary">En formation</Badge>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {filteredPlongeurs.length === 0 && (
                <p className="text-center text-muted-foreground mt-6">Aucun plongeur trouvé.</p>
            )}
        </div>
    )
}