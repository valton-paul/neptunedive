'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {Waves} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import axios from "@/api/Axios";
import toast from "react-hot-toast";

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await axios.post("/api/auth", {email, password}, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            router.push('/')

        } catch (error) {
            toast.error('Identifiants incorrects', {
                icon: '❌',
            });
            router.push('/login'); // Redirige vers la connexion en cas
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#e6f4ff] px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center mb-4">
                        <Waves size={40} className="text-[#2f3570]"/>
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">Connexion</CardTitle>
                    <CardDescription className="text-center">
                        Entrez vos identifiants pour accéder à votre compte
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Adresse e-mail</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="exemple@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Mot de passe</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-[#2f3570] hover:bg-[#4a5180]" onClick={handleSubmit}>
                        Se connecter
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}