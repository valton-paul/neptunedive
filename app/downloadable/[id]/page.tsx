'use client'
// pages/commentaires/lieuList.tsx
import {useParams} from "next/navigation";
import {RoleGuard} from "@/components/role-guard";
import {getSortieById} from "@/api/sortiesApi";
import {useCustomQuery} from "@/tanStackQuery/queryGenerator";
import {PrintableSafetySheetComponent} from "@/components/components-sorties-safety-sheet-printable-safety-sheet";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, {useEffect} from "react";
import {Button} from "@/components/ui/button";
import toast from "react-hot-toast";
import {Sortie} from "@/types/Sortie";

export default function Page() {
    const params = useParams<{ id: string }>()
    const printRef = React.useRef<HTMLDivElement>(null)
    const {data: sortie} = useCustomQuery(
        ["sortie", params.id],
        () => getSortieById(params.id),
        {enabled: !!params.id}
    );

    const print = async (sortie: Sortie) => {
        const element = printRef.current;
        if (!element || !sortie) {
            toast("Impossible de générer le PDF", { icon: "❌" });
            return;
        }

        // Échelle plus élevée pour une meilleure netteté
        const canvas = await html2canvas(element, {
            scale: 3,                  // Meilleure netteté
            scrollX: 0,                // Neutralise le défilement horizontal
            scrollY: 0,                // Neutralise le défilement vertical
            windowWidth: element.scrollWidth,   // Largeur totale du conteneur
            windowHeight: element.scrollHeight, // Hauteur totale du conteneur
        });
        const data = canvas.toDataURL("image/png");

        // Ici on utilise 'mm' pour que ça matche le CSS (210mm x 297mm)
        const pdf = new jsPDF({
            orientation: "landscape", // pour 297 mm (width) x 210 mm (height)
            unit: "mm",
            format: "a4",
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();   // 210 mm
        const pdfHeight = pdf.internal.pageSize.getHeight(); // 297 mm

        pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);

        const name =
            "fiche-de-securite-" +
            sortie.dateSortie?.split("T")[0] +
            "-" +
            sortie.idLieu.nomLieu +
            "-" +
            sortie.id +
            ".pdf";

        pdf.save(name);
    };
    useEffect(() => {
        // Attendre un "tick" pour être sûr que tout soit monté
        setTimeout(() => {
            if (!sortie) return
            print(sortie)
        }, 500)
    }, [sortie])

    if (!sortie) {
        return null;
    }

    return (

        <RoleGuard role={'ROLE_MONITEUR'}>
            <div ref={printRef} className={"w-[297mm]"}>
                <PrintableSafetySheetComponent sortie={sortie}/>
            </div>
            <Button onClick={() => print(sortie)}>Télécharger</Button>
        </RoleGuard>

    );
}
