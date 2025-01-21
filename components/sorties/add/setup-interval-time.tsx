'use client';

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { AlarmClockPlus } from "lucide-react";
import React, { useState } from "react";
import { Select } from "@/components/ui/select";
import {updateCronJob} from "@/api/sortiesApi";
import toast from "react-hot-toast";

export function SetupIntervalTime() {
    const [intervalType, setIntervalType] = useState("dayly");
    const [interval, setInterval] = useState("");

    const typeInterval = [
        { value: "dayly", label: "Intervalle en jours" },
        { value: "weekly", label: "Intervalle en semaine" },
        { value: "montly", label: "Intervalle en mois" },
    ];

    const intervalDays = [
        { value: "1day", label: "Tous les jours" },
        { value: "2day", label: "Tous les 2 jours" },
        { value: "3day", label: "Tous les 3 jours" },
        { value: "4day", label: "Tous les 4 jours" },
        { value: "5day", label: "Tous les 5 jours" },
        { value: "6day", label: "Tous les 6 jours" },
    ];

    const intervalWeeks = [
        { value: "1week", label: "Toutes les semaines" }
    ];

    const intervalMonths = [
        { value: "1month", label: "Tous les mois" },
    ];

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updateCronJob(interval)
            .then((r) => {
                if(r === 200){
                    toast.success('Mise à jour réussite', {icon: '🎉'});
                }else {
                    toast.error('Erreur lors de la mise à jour', {icon: '⚠️'});
                }
            })
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="p-2 h-full flex items-center hover:bg-[#43497E] rounded-e-lg cursor-pointer">
                    <AlarmClockPlus />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Automatiser l'import des sorties</DialogTitle>
                    <DialogDescription>
                        Choisissez un intervalle de temps pour importer automatiquement les sorties.
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit}
                    className="grid gap-4 py-4"
                >
                    <Select
                        label="Sélectionnez le type de déclencheur temporel :"
                        options={typeInterval}
                        value={intervalType}
                        className={"p-3 rounded-md shadow-md"}
                        onChange={(e) => setIntervalType(e.target.value)}
                    />
                    {intervalType === "dayly" && (
                        <Select
                            label="Sélectionnez l'intervalle de jours :"
                            options={intervalDays}
                            value={interval}
                            className={"p-3 rounded-md shadow-md"}
                            onChange={(e) => setInterval(e.target.value)}
                        />
                    )}
                    {intervalType === "weekly" && (
                        <Select
                            label="Sélectionnez l'intervalle de semaines :"
                            options={intervalWeeks}
                            value={interval}
                            className={"p-3 rounded-md shadow-md"}
                            onChange={(e) => setInterval(e.target.value)}
                        />
                    )}
                    {intervalType === "montly" && (
                        <Select
                            label="Sélectionnez l'intervalle de mois :"
                            options={intervalMonths}
                            value={interval}
                            className={"p-3 rounded-md shadow-md"}
                            onChange={(e) => setInterval(e.target.value)}
                        />
                    )}
                    <div className="flex justify-end gap-3">
                        <Button variant="outline" type="button">
                            Annuler
                        </Button>
                        <Button type="submit" className={"bg-[#2f3570] hover:bg-[#43497E]"}>Enregistrer</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
