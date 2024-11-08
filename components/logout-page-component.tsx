import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {AlertTriangle, Home} from "lucide-react";
import {Button} from "@/components/ui/button";
import {logout} from "@/api/plongeurApi";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function LogoutPageComponent() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        logout().then(() => {
            setLoading(false);
        });
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#e6f4ff] p-4">
            <Card className="max-w-md w-full">
                <CardHeader className="bg-[#2f3570] text-white text-center py-6">
                    <AlertTriangle className="mx-auto h-12 w-12 mb-4"/>
                    <CardTitle className="text-2xl font-bold">Déconnexion</CardTitle>
                </CardHeader>
                <CardContent className="text-center p-6">
                    {loading ? (
                        <p className="text-gray-600 mb-4">
                            Déconnexion en cours...
                        </p> ) : (

                    <p className="text-gray-600 mb-4">
                        Vous avez été déconnecté avec succès.
                    </p>
                    )}
                </CardContent>
                <CardFooter className="bg-gray-50 p-4">
                    <Button
                        onClick={() => router.push('/login')}
                        className="w-full bg-[#2f3570] hover:bg-[#4a5180] text-white"
                    >
                        Retour a la page de connexion
                    </Button>
                </CardFooter>
            </Card>
        </div>

    )
}