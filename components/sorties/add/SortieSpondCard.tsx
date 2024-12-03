import {SortieSpond} from "@/types/SortieSPond";

export function SortieSpondCard({sortie, onClick}: { sortie: SortieSpond, onClick: () => void }) {
    return <div className={"flex justify-between flex-wrap items-center p-2 border rounded-md shadow"}>
        <div>
            <p className={"text-lg font-bold"}>{sortie.lieu}</p>
            <p className={"text-sm"}>{sortie.dateSortie} </p>
            <p className={"text-sm"}>{sortie.creneau}</p>
        </div>
        <button
            onClick={onClick}
            className={"bg-[#2f3570] text-white py-2 px-4 text-sm rounded-md hover:bg-[#43497E] transition-colors"}>
            Importer
        </button>
    </div>;
}