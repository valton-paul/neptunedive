import {Input} from "@/components/ui/input";
import {Card, CardContent} from "@/components/ui/card";
import {User} from "lucide-react";
import {useEffect, useState} from "react";
import {useCustomQuery} from "@/tanStackQuery/queryGenerator";
import {getAllPlongeurs} from "@/api/plongeurApi";
import {Plongeur} from "@/types/Plongeur";
import {useRouter} from "next/navigation";

export default function PlongeursPageComponent() {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState('')
    const {data: plongeurs, isLoading} = useCustomQuery<Plongeur[]>(
        ['plongeurs'],
        () =>getAllPlongeurs()
    )
    const [filteredPlongeurs, setFilteredPlongeurs] = useState<Plongeur[]>([])

    useEffect(() => {
        if (!isLoading) {
            setFilteredPlongeurs(
                plongeurs.filter(plongeur =>
                    plongeur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    plongeur.prenom.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [isLoading, plongeurs, searchTerm]);

    const redirect = (id: number) => {
        const path = `/plongeurs/${id}`
        router.push(path)
    }

    return (
        <div className="container mx-auto p-4 bg-[#e6f4ff] min-h-screen">
            <h1 className="text-3xl font-bold text-center text-[#2f3570] mb-6">Liste des Plongeurs</h1>

            <div className="mb-6">
                <Input
                    type="text"
                    placeholder="Rechercher un plongeur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-md mx-auto"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredPlongeurs.map((plongeur) => (
                    <Card key={plongeur.id} className="bg-white hover:shadow-lg transition-shadow duration-300" onClick={() => redirect(plongeur.id)}>
                        <CardContent className="p-4 flex flex-col items-center">
                            <div className="w-16 h-16 bg-[#2f3570] rounded-full flex items-center justify-center mb-3">
                                <User className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="text-lg font-semibold text-[#2f3570] text-center">{`${plongeur.prenom} ${plongeur.nom}`}</h2>
                            {plongeur.isMoniteur && (
                                <span className="mt-1 px-2 py-1 bg-[#4a5180] text-white text-xs rounded-full">Moniteur</span>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredPlongeurs.length === 0 && (
                <p className="text-center text-gray-500 mt-6">Aucun plongeur trouvé.</p>
            )}
        </div>
    )
}