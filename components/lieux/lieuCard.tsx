import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Trash2, Edit } from 'lucide-react'
import {ImageFromBase64} from "@/components/ui/ImageFromBase64";
const LieuCard = ({ lieu, editLieu, deleteLieu }) => {
    return (
        <Card key={lieu.id}>
            <CardHeader>
                <CardTitle>{lieu.nomLieu}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-600 mb-2">{lieu.description}</p>
                {lieu.photo && (
                    <ImageFromBase64
                        base64String={lieu.photo}
                        className="relative overflow-hidden w-full h-48 sm:h-full object-cover"
                    />
                )}
                {lieu.lienMaps && (
                    <a
                        href={lieu.lienMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-500 hover:underline"
                    >
                        <MapPin className="w-4 h-4 mr-1" />
                        View on Google Maps
                    </a>
                )}
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" size="icon" onClick={() => editLieu(lieu)}>
                    <Edit className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => deleteLieu(lieu.id)}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default LieuCard;
