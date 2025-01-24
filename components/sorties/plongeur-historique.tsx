import { useCustomQuery } from "@/tanStackQuery/queryGenerator"
import { getSortiesUserDone } from "@/api/sortiesApi"
import type { Sortie } from "@/types/Sortie"
import { SortieCard } from "@/components/sorties/sortie-card"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface PlongeurPageFromIdProps {
    idPlongeur: number
}

const ITEMS_PER_PAGE = 15
const SORTIE_TYPES_FILTER = ["Piscine", "Mer"]

type SortieType = (typeof SORTIE_TYPES_FILTER)[number]

export function PlongeurHistorique({ idPlongeur }: PlongeurPageFromIdProps) {
    const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE)
    const [filters, setFilters] = useState<SortieType[]>([])

    const { data: sorties = [], isLoading } = useCustomQuery<Sortie[]>(
        ["sorties", idPlongeur.toString()],
        () => getSortiesUserDone(idPlongeur.toString()),
        { enabled: !!idPlongeur },
    )

    const filteredSorties = useMemo(() => {
        const sortiesFiltered = filters.length === 0
            ? sorties
            : sorties.filter((sortie) => filters.some((filter) =>
                sortie.type.toLowerCase().includes(filter.toLowerCase())));

        return sortiesFiltered.sort((a, b) => new Date(b.dateSortie).getTime() - new Date(a.dateSortie).getTime());
    }, [sorties, filters]);


    const displayedSorties = filteredSorties.slice(0, displayCount)
    const hasMore = displayCount < filteredSorties.length

    const handleLoadMore = () => {
        setDisplayCount((prevCount) => prevCount + ITEMS_PER_PAGE)
    }

    const handleFilterChange = (type: SortieType) => {
        setFilters((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
        setDisplayCount(ITEMS_PER_PAGE)
    }

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
                {SORTIE_TYPES_FILTER.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                            id={`filter-${type}`}
                            checked={filters.includes(type)}
                            onChange={() => handleFilterChange(type)}
                        />
                        <Label
                            htmlFor={`filter-${type}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {type}
                        </Label>
                    </div>
                ))}
            </div>

            {filteredSorties.length > 0 ? (
                <>
                    <ul className="space-y-4">
                        {displayedSorties.map((sortie: Sortie) => (
                            <li key={sortie.id}>
                                <SortieCard sortie={sortie} displayEnrollButton={false}/>
                            </li>
                        ))}
                    </ul>
                    {hasMore && (
                        <Button onClick={handleLoadMore} className="mt-4">
                            Charger plus
                        </Button>
                    )}
                </>
            ) : (
                <p>Aucune sortie trouvée pour les filtres sélectionnés.</p>
            )}
        </div>
    )
}

