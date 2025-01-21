"use client"

import React, {useState} from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,} from "@/components/ui/sheet"
import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from "@/components/ui/collapsible"
import {
    Anchor,
    Calendar,
    CalendarPlus,
    ChevronDown,
    DoorOpen,
    Fish,
    LandPlot,
    Menu,
    MessageSquareText,
    User,
    Users,
    Wrench
} from 'lucide-react'
import {useUser} from "@/lib/useUser"
import {useCustomQuery} from "@/tanStackQuery/queryGenerator"
import {getLateFeedbacks} from "@/api/commentairesAPI"

// <-- ajout
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip"

type NavItem = {
    href: string
    icon: React.ElementType
    label: string,
    tooltip: string
    role_required?: string[]
}

type NavGroup = {
    label: string
    items: NavItem[]
    role_required?: string[]
}

const navGroups: NavGroup[] = [
    {
        label: "Sorties",
        items: [
            {href: '/mine', label: 'Mes sorties', icon: Fish, tooltip: 'Voir les sortis auxquelles vous êtes inscrit, passées et à venir'},
            {href: '/', label: 'Toutes les sorties', icon: Calendar, tooltip: 'Voir toutes les sorties disponibles'},
        ]
    },
    {
        label: "Gestion",
        items: [
            {href: '/sorties/form', icon: CalendarPlus, label: 'Créer sortie', tooltip: 'Créer une nouvelle sortie'},
            {href: '/plongeurs', icon: Users, label: 'Plongeurs', tooltip: 'Gérer les plongeurs'},
            {href: '/club', icon: Wrench, label: 'Club', role_required: ['ROLE_ADMIN'], tooltip: 'Gérer les paramètres du club'},
            {href: '/bateaux', icon: Anchor, label: 'Bateaux', tooltip: 'Ajouter ou modifier des bateaux'},
            {href: '/lieux', icon: LandPlot, label: 'Lieux', tooltip: 'Ajouter ou modifier des lieux de plongée'},
        ],
        role_required: ['ROLE_MONITEUR', 'ROLE_ADMIN']
    },
]

export default function Navigation() {
    const pathName = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [openGroups, setOpenGroups] = useState<string[]>(navGroups.map(group => group.label))
    const {user, loading} = useUser()

    // <-- ajout: On enveloppe notre Link+Button dans un Tooltip
    const NavLink = ({href, icon: Icon, label, tooltip}: NavItem) => (
        <Tooltip> {/* Debut du Tooltip */}
            <TooltipTrigger asChild>
                <Link href={href} passHref>
                    <Button
                        variant="ghost"
                        className={cn(
                            "w-full justify-start text-gray-700 hover:text-[#2f3570] hover:bg-[#e6e8f5]",
                            pathName === href && "bg-[#2f3570] text-white hover:bg-[#4a5180] hover:text-white"
                        )}
                        onClick={() => setIsOpen(false)}
                    >
                        <Icon className="mr-1 h-5 w-5"/>
                        <span className="text-base">{label}</span>
                    </Button>
                </Link>
            </TooltipTrigger>
            <TooltipContent> {/* Contenu de l'infobulle */}
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    )

    const NavGroupCollapsible = ({group}: { group: NavGroup }) => {
        const isGroupOpen = openGroups.includes(group.label)

        return (
            <div className="bg-gray-50 rounded-md p-3">
                <Collapsible
                    open={isGroupOpen}
                    onOpenChange={(open) => {
                        if (open) {
                            setOpenGroups([...openGroups, group.label])
                        } else {
                            setOpenGroups(openGroups.filter(label => label !== group.label))
                        }
                    }}
                >
                    <CollapsibleTrigger asChild>
                        <Button
                            variant="ghost"
                            className="w-full justify-between text-gray-700 hover:text-[#2f3570] hover:bg-[#e6e8f5] text-base"
                        >
                            <span className="flex items-center">
                                <h3 className="px-3 text-sm font-semibold text-[#2f3570]">
                                    {group.label}
                                </h3>
                            </span>
                            <ChevronDown
                                className={cn("h-4 w-4 transition-transform", isGroupOpen && "transform rotate-180")}
                            />
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1">
                        {group.items.map((item) => {
                            if (item.role_required && !item.role_required.some(role => user?.roles.includes(role))) {
                                return null
                            }
                            return <NavLink key={item.href} {...item} />
                        })}
                    </CollapsibleContent>
                </Collapsible>
            </div>
        )
    }

    const {data: lateFeedbacks} = useCustomQuery(
        ["lateFeedbacks"],
        () => getLateFeedbacks(user?.id.toString()),
        {enabled: !loading && user && user.roles.includes('ROLE_MONITEUR')}
    )

    const renderNavItems = (isMobile: boolean) => (
        <>
            {navGroups.map((group) => {
                if (group.role_required && !group.role_required.some(role => user?.roles.includes(role))) {
                    return null
                }
                return (
                    isMobile ? (
                        <div key={group.label} className="space-y-2">
                            <h3 className="px-3 text-sm font-semibold text-[#2f3570]">{group.label}</h3>
                            {group.items.map((item) => {
                                if (item.role_required && !item.role_required.some(role => user?.roles.includes(role))) {
                                    return null
                                }
                                return (
                                    <NavLink key={item.href} {...item} />
                                )
                            })}
                        </div>
                    ) : (
                        <NavGroupCollapsible key={group.label} group={group}/>
                    )
                )
            })}
            <NavLink href="/profil" icon={User} label="Profil" tooltip={"Voir votre profil"}/>
            {user?.isMoniteur && (
                <div className="relative">
                    <NavLink
                        href="/lateFeedback"
                        icon={MessageSquareText}
                        label="Fiches de suivi"
                        tooltip="Accéder aux fiches de suivi en attente de complétion"
                    />
                    {lateFeedbacks && lateFeedbacks.length > 0 && (
                        <span
                            className="absolute top-2 right-2 bg-red-500 rounded-full h-5 w-5 text-xs flex items-center justify-center text-white"
                        >
                            {lateFeedbacks.length}
                        </span>
                    )}
                </div>
            )}
            <NavLink href="/logout" icon={DoorOpen} label="Déconnexion" tooltip={"Se déconnecter de l'application"}/>
        </>
    )

    return (
        // <-- ajout: On encadre tout le composant par un TooltipProvider pour activer les tooltips
        <TooltipProvider>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="lg:hidden fixed top-4 left-4 z-50 bg-white text-[#2f3570] border-[#2f3570] hover:bg-[#e6e8f5]"
                    >
                        <Menu className="h-5 w-5"/>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 bg-white border-r border-gray-200 overflow-y-auto h-full">
                    <SheetHeader>
                        <SheetTitle className="text-[#2f3570] text-2xl">NeptuneDive</SheetTitle>
                        <SheetDescription>
                            👋 Bienvenue {user?.prenom} !
                        </SheetDescription>
                    </SheetHeader>
                    <nav className="flex flex-col space-y-4 mt-8">
                        {renderNavItems(true)}
                    </nav>
                </SheetContent>
            </Sheet>

            <nav
                className="hidden lg:flex lg:flex-col space-y-3 p-6 bg-white border-r border-gray-200 h-screen w-80 left-0 top-0 overflow-y-auto">
                <h2 className="text-2xl font-bold text-[#2f3570]">NeptuneDive</h2>
                <span className="text-sm text-gray-500 mb-6">👋 Bienvenue {user?.prenom} !</span>
                {renderNavItems(false)}
            </nav>
        </TooltipProvider>
    )
}
