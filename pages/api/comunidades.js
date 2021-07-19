import { SiteClient} from "datocms-client"

export default async function recebedorDeRequests(request, response) {

    if (request.method === "POST") {
        const TOKEN = "e9c01478c5f4cf32d47f8ead5e088f";

        const client = new SiteClient(TOKEN);
    
        const registroCriado = await client.items.create({
            itemType: "975329", // ID do model de comunidades criado pelo Dato
            ...request.body,
            // title: "Comunidade teste",
            // imageUrl: "https://www.github.com/Gabrielzkk.png",
            // creatorSlug: "Gabrielzkk",
        })
    
        response.json({
            dados: "Dados aleatórios",
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: "Ainda não temos nada no GET, mas no POST tem."
    })
}