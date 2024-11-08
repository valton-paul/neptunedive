'use client'

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { InscriptionPlongeur } from '@/types/InscriptionPlongeur';
import { getAllDemande, postValidateDemande } from '@/api/inscriptionsApi';

export function DemandesList() {
    const [demandes, setDemandes] = useState<InscriptionPlongeur[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedDemande, setSelectedDemande] = useState<InscriptionPlongeur | null>(null);

    useEffect(() => {
        // Récupère toutes les demandes lorsque le composant est monté
        getAllDemande().then(data => {
            setDemandes(data);
            setLoading(false);
        });
    }, []);

    const handleValidate = async (demandeId: number) => {
        try {
            await postValidateDemande(demandeId.toString());
            // Met à jour l'état pour refléter la validation
            setDemandes(prevDemandes =>
                prevDemandes.map(demande =>
                    demande.id === demandeId ? { ...demande, validee: true } : demande
                )
            );
            // Met à jour la demande sélectionnée si nécessaire
            if (selectedDemande && selectedDemande.id === demandeId) {
                setSelectedDemande({ ...selectedDemande, validee: true });
            }
        } catch (error) {
            console.error('Erreur lors de la validation de la demande', error);
        }
    };

    if (loading) {
        return <div>Chargement des demandes...</div>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Liste des demandes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {demandes.map(demande => (
                    <div
                        key={demande.id}
                        className="border p-4 rounded-md shadow cursor-pointer"
                        onClick={() => setSelectedDemande(demande)}
                    >
                        <p><strong>Email:</strong> {demande.email}</p>
                        <p><strong>Nom:</strong> {demande.nom}</p>
                        <p><strong>Prénom:</strong> {demande.prenom}</p>
                        <p><strong>Validée:</strong> {demande.validee ? 'Oui' : 'Non'}</p>
                    </div>
                ))}
            </div>
            {selectedDemande && (
                <div className="mt-6 border p-4 rounded-md shadow">
                    <h3 className="text-xl font-bold">
                        Demande de {selectedDemande.prenom} {selectedDemande.nom}
                    </h3>
                    <div className="space-y-2 mt-4">
                        <p><strong>Email:</strong> {selectedDemande.email}</p>
                        <p><strong>Nom:</strong> {selectedDemande.nom}</p>
                        <p><strong>Prénom:</strong> {selectedDemande.prenom}</p>
                        <p><strong>Formation:</strong> {selectedDemande.formation ? 'Oui' : 'Non'}</p>
                        <p><strong>Validée:</strong> {selectedDemande.validee ? 'Oui' : 'Non'}</p>
                        <p><strong>Niveau Plongée Autonome:</strong> {selectedDemande.niveauPlongeeAutonome || 'N/A'}</p>
                        <p><strong>Niveau Plongée Encadrée:</strong> {selectedDemande.niveauPlongeeEncadre || 'N/A'}</p>
                        <p><strong>Niveau Moniteur:</strong> {selectedDemande.niveauMoniteur || 'N/A'}</p>
                    </div>
                    {!selectedDemande.validee && (
                        <Button onClick={() => handleValidate(selectedDemande.id)}>
                            Valider la demande
                        </Button>
                    )}
                    <Button
                        variant="secondary"
                        onClick={() => setSelectedDemande(null)}
                        className="ml-2"
                    >
                        Fermer
                    </Button>
                </div>
            )}
        </div>
    );
}
