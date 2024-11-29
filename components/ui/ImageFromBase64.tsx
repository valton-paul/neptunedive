import Image from 'next/image';

export function ImageFromBase64({ base64String, format = "png", alt = "Image", width = 500, height = 500 }) {
    if (!base64String) {
        return <p>No image data</p>;
    }

    const imageUrl = `data:image/${format};base64,${base64String}`;

    return (
        <Image
            src={imageUrl}
            alt={alt}
            width={width}
            height={height}
            unoptimized // Nécessaire pour des images en base64 (voir remarques ci-dessous)
            // Le composant Image de Next.js est conçu pour fonctionner avec des URLs d'images valides. Les images en base64 contournent le pipeline d'optimisation.
            // En ajoutant unoptimized, vous désactivez la gestion des images par Next.js pour ce cas précis.
        />
    );
}
