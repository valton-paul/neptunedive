import {SortieSpond} from "@/types/SortieSPond";

export function SortieSpondCard({sortie, onClick}: { sortie: SortieSpond, onClick: () => void }) {
    const [year, month, day] = sortie.dateSortie.split('-');
    return <div className={"flex justify-between flex-wrap items-center p-2 border rounded-md shadow"}>
        <div>
            <p className={"text-lg font-bold"}>Sortie à {sortie.lieu}</p>
            <p className={"text-sm"}> Date:  {day+"/"+month+"/"+year}</p>
            <p className={"text-sm"}>Heure:  {sortie.heure_sortie.slice(0, 5)}</p>
            <p className={"text-sm"}>Nombre de participants: {sortie.participants.length}</p>
        </div>
        <button
            onClick={onClick}
            className={"bg-[#2f3570] text-white py-2 px-4 text-sm rounded-md hover:bg-[#43497E] transition-colors"}>
            Importer
        </button>
    </div>;
}