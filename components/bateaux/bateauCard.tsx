import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Anchor, Check, Edit, Trash2} from "lucide-react";
import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";

const BateauCard = ({bateau, onModify, onDelete}) => {
    const [onGoingChange, setOnGoingChange] = useState(false);
    const [nbPlaces, setNbPlaces] = useState(0);
    const [immatriculation, setImmatriculation] = useState('');

    useEffect(() => {
        setImmatriculation(bateau.immatriculation);
        setNbPlaces(bateau.nbPlaces);
    }, []);

    const handleChangeImmatriculation = (e) => {
        setImmatriculation(e.target.value);
    };

    const handleChangeNbPlaces = (e) => {
        setNbPlaces(e.target.value);
    };
    const modificationMode = () => {
        setOnGoingChange(true)
    }

    const handleModification = (id: number) => {
        const payload = {
            id: id,
            immatriculation: immatriculation,
            nbPlaces: Number(nbPlaces)
        }
        setOnGoingChange(false);
        onModify(payload);
    }

    return (
        <Card key={bateau.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-4">
                {onGoingChange ? (
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                            <Anchor className="h-5 w-5 text-blue-500"/>
                            <Input
                                className={"font-semibold"}
                                value={immatriculation}
                                onChange={handleChangeImmatriculation}
                            />
                        </div>
                        <Input
                            className={"font-semibold"}
                            value={nbPlaces}
                            onChange={handleChangeNbPlaces}
                        />
                    </div>
                ) : (
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                            <Anchor className="h-5 w-5 text-blue-500"/>
                            <span className="font-semibold">{bateau.immatriculation}</span>
                        </div>
                        <span className="font-semibold">Places : {bateau.nbPlaces}</span>
                    </div>
                )}
                <div className="flex justify-end space-x-2 mt-4">
                    {onGoingChange ? (
                        <div>
                            <Button className={"bg-green-600"} variant="outline" size="sm"
                                    onClick={() => handleModification(bateau.id)}>
                                <Check className="h-4 w-4 mr-1"/>
                                Confirmer
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setOnGoingChange(false)}>
                                <Edit className="h-4 w-4 mr-1"/>
                                Annuler
                            </Button>
                        </div>
                    ) : (
                        <Button variant="outline" size="sm" onClick={() => modificationMode(bateau.id)}>
                            <Edit className="h-4 w-4 mr-1"/>
                            Modifier
                        </Button>
                    )}
                    <Button variant="destructive" size="sm" onClick={() => onDelete(bateau.id)}>
                        <Trash2 className="h-4 w-4 mr-1"/>
                        Supprimer
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default BateauCard;
