'use client'
// pages/commentaires/lieuList.tsx
import {useParams} from "next/navigation";
import {RoleGuard} from "@/components/role-guard";
import {getSortieById} from "@/api/sortiesApi";
import {useCustomQuery} from "@/tanStackQuery/queryGenerator";
import {PrintableSafetySheetComponent} from "@/components/components-sorties-safety-sheet-printable-safety-sheet";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, {useEffect, useState} from "react";
import {Card} from "@/components/ui/card";
import {FileDown, Loader2} from "lucide-react";

export default function Page() {
    const params = useParams<{ id: string }>()
    const [showPrintable, setShowPrintable] = useState(false)
    const printRef = React.useRef<HTMLDivElement>(null)
    const {data: sortie} = useCustomQuery(
        ["sortie", params.id],
        () => getSortieById(params.id),
        {enabled: !!params.id}
    );
    const print = async () => {
        const element = printRef.current
        if (!element) return
        if (!sortie) return

        const canvas = await html2canvas(element, {scale: 2})
        const data = canvas.toDataURL("image/png")

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: "a4",
        })

        const imgProperties = pdf.getImageProperties(data)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width

        pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight)
        const name = "fiche-de-securite-" + sortie.dateSortie?.split("T")[0] + "-" + sortie.idLieu.nomLieu + "-" + sortie.id + ".pdf"
        pdf.save(name)
        setShowPrintable(false)
    }

    useEffect(() => {
        setShowPrintable(true)
        // Attendre un "tick" pour être sûr que tout soit monté
        setTimeout(() => {
            if (!sortie) return
            print()
        }, 500)
    }, [sortie])

    if (!sortie) {
        return null;
    }

    return (

        <RoleGuard role={'ROLE_MONITEUR'}>
            <Card className="w-full max-w-md mx-auto p-8 text-center space-y-4">
                <div className="flex justify-center">
                    <div className="relative">
                        <FileDown className="w-16 h-16 text-primary" />
                        <Loader2 className="w-16 h-16 absolute top-0 left-0 animate-spin opacity-50" />
                    </div>
                </div>

                <h2 className="text-2xl font-semibold text-primary">Téléchargement en cours</h2>
                <p className="text-muted-foreground">
                    La fiche de sécurité va être téléchargée dans quelques instants...
                </p>
            </Card>
            <div ref={printRef} style={{
                position: 'fixed',
                top: showPrintable ? 0 : '-9999px',
                left: showPrintable ? 0 : '-9999px',
                visibility: showPrintable ? 'visible' : 'hidden',
            }}>
                <PrintableSafetySheetComponent sortie={sortie}/>
            </div>
        </RoleGuard>

    );
}
