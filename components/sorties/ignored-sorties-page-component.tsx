import {useUser} from "@/lib/useUser";
import {useCustomMutation, useCustomQuery} from "@/tanStackQuery/queryGenerator";
import {getAllIgnoredSorties, getSortiesWhereUserIsEnrolled, unignoreSortie} from "@/api/sortiesApi";
import {useState} from "react";
import {Input} from "@/components/ui/input";
import {ScrollArea} from "@/components/ui/scroll-area";
import {SortieCard} from "@/components/sorties/sortie-card";

export function ListeSortiesIgnored() {
    const [searchTerm, setSearchTerm] = useState("")

    const { user, loading: userLoading } = useUser();

    const getSortiesFromIgnoredSorties = async () => {
        const ignoredSorties = await getAllIgnoredSorties(user?.id);
        return ignoredSorties.map(i => i.sortie);
    }

    const { data: ignoredSorties = [], isLoading } = useCustomQuery(
        ['ignoredSorties', user?.id],
        () => getSortiesFromIgnoredSorties(),
        { enabled: !!user?.id }
    );

    const { mutate: unignoreSortieMutation } = useCustomMutation(
        async (sortieId: string) => {
            return await unignoreSortie(sortieId, user.id.toString());
        },
        [['ignoredSorties']]
    )

    const filteredSorties = ignoredSorties.filter(sortie =>
        sortie.lieu.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sortie.type.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleUnignore = (sortieId: string) => {
        unignoreSortieMutation(sortieId)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-[#2f3570]">Sorties Ignorées</h1>
            <Input
                type="text"
                placeholder="Rechercher une sortie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4"
            />
            <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                {isLoading ? (
                    <p className="text-center text-gray-500">Chargement...</p>
                ) : filteredSorties.length > 0 ? (
                    filteredSorties.map(sortie => (
                        <div key={sortie.id} className="mb-4">
                            <SortieCard
                                sortie={sortie}
                                displayEnrollButton={false}
                                displayIgnoreButton={false}
                            >
                            </SortieCard>

                            <button
                                onClick={() => handleUnignore(sortie.id.toString())}
                                className="mt-4 w-full bg-[#2f3570] text-white py-2 px-4 rounded hover:bg-[#43497E] transition-colors"
                            >
                                Afficher à nouveau
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">
                        Aucune sortie ignorée trouvée
                    </p>
                )}
            </ScrollArea>
        </div>
    );
}