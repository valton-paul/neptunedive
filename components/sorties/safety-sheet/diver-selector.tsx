'use client'

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plongeur } from "@/types/Plongeur"

interface DiverSelectorProps {
  divers: Plongeur[]
  onSelectDiver: (diverId: string) => void
  trigger: React.ReactNode
}

export function DiverSelector({ divers, onSelectDiver, trigger }: DiverSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const filteredDivers = divers.filter(
      (diver) =>
          diver.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          diver.prenom.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectDiver = (diverId: string) => {
    onSelectDiver(diverId)
    setIsOpen(false)
  }

  return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-[#f8fafc] shadow-lg rounded-lg border border-gray-300">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-[#2f3570]">Sélectionner un plongeur</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
                placeholder="Rechercher un plongeur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-md focus:ring-[#2f3570] focus:border-[#2f3570]"
            />
            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {filteredDivers.map((diver) => (
                    <Button
                        key={diver.id}
                        variant="ghost"
                        className="w-full h-full border shadow justify-start text-[#2f3570] hover:bg-[#e3e8f3] rounded-md"
                        onClick={() => handleSelectDiver(diver.id.toString())}
                    >
                      <div className={"flex items-center flex-wrap gap-2 "}>
                        {`${diver.prenom} ${diver.nom}`}
                        <div className={"flex gap-2 2xl:ms-2 flex-wrap xl:flex-nowrap"}>
                          <div className={"flex divide-x gap-1 border-white  px-2 py-1 bg-[#4a5180] text-white text-xs rounded-full"}>
                            <span>PA{diver.niveauPlongeeAutonome}</span>
                            <span className={'ps-1'}>PE{diver.niveauPlongeeEncadre}</span>
                            <span className={'ps-1'}>{diver.niveauMoniteur}</span>
                          </div>
                          {diver.formation && (
                              <span
                                  className=" px-2 py-1 bg-[#4a5180] text-white text-xs rounded-full">En formation</span>
                          )}
                        </div>
                      </div>

                    </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
  )
}