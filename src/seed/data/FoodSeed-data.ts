import * as bcrypt from 'bcrypt';
interface SeedFood {
    title: string;
    description: string;
    slug: string;
    price: number;
    images: string[]
}

interface SeedUser {
    email:string
    fullName: string
    password: string
    roles: string[]
}

interface SeedData{
    users: SeedUser[];    
    foods: SeedFood[];
}

export const initialFoodData: SeedData = {
    users:[
        {
            email: 'test1@google.com',
            fullName: 'Test One',
            password: bcrypt.hashSync('Abc123', 10),
            roles: ['admin']
        },
        {
            email: 'test2@google.com',
            fullName: 'Test Two',
            password: bcrypt.hashSync('Abc123', 10),
            roles: ['user', 'super']
        }
    ],
    foods: [
        {
            title: "Reina papeada",
            description: "Arepa con 150gr de harina pan, pollo esmechado, tomate, cebolla, ajo, aceite de oliva, sal, aguacate y queso rallado 50gr",
            images: ["a96235ab-8085-44ef-a47d-0320512bb9f6.webp"],
            price: 25,
            slug: "reina_papeada",
        },
        {
            title: "Empanadas de pollo",
            description: "80gr de pollo esmechado, con salsa de ajo y guasacaca",
            images: ["2cba60c4-2d2f-460d-a886-cef4c5f02b4b.jpg"],
            price: 18,
            slug: "empanadas_de_pollo",
        },
        {
            title: "Pasta bolognesa",
            description: "150gr de pasta, salsa de tomate, 90gr de carne molida envuelta en salsa de tomate",
            images: ["8dc71587-b344-40c0-b4ff-6c92631aa0df.webp"],
            price: 15,
            slug: "pasta_bolognesa",
        },
        {
            title: "Hamburguesa Smash doble",
            description: "Pan de hamburguesa, 240gr de carne, tomate, cebolla, papas fritas, lechuga y pepinillos",
            images: ["f0107220-256f-4035-b650-d6b4f32ebf7e.png"],
            price: 15,
            slug: "hamburgesa_smash",
        },
        {
            title: "Boca burguer",
            description: "Pan Brioche, carne de res, queso cheddar, lechuga, tomate, cebolla morada, salsas tradicionales",
            images: ["f22c3f48-c000-4320-8e14-4edbb936c3f7.png"],
            price: 19,
            slug: "boca_burger",
        },
        {
            title: "Alitas BBQ O Picantes",
            description: "Alitas de Pollo a la BBQ o Picantes acompoañadas de papas fritas",
            images: ["c2391151-7194-4554-8163-2fcd29e2e024.png"],
            price: 9,
            slug: "alitas_bbq_o_picantes",
        },
        {
            title: "Tenders",
            description: "Deliciosos tenders de pollo acompñado de papas fritas",
            images: ["84765511-fa0b-4705-a9f8-1ec851838aad.png"],
            price: 7,
            slug: "tenders",
        },
        {
            title: "Parripapas",
            description: "350gr de papas fritas, queso fundido, crujientes tocinetas troceadas",
            images: ["b6b87d11-5465-4ed2-8ef7-36ca6022ad16.png"],
            price: 8,
            slug: "parripapas",
        },
        {
            title: "Ensalada César",
            description: "Lechuga Romana, aderezo césar, crutones, tocineta toceadas y queso pecorino",
            images: ["88e650de-ef71-4402-9924-814b0116f4fb.jpg"],
            price: 10,
            slug: "ensalada_c_esar",
        },
        {
            title: "Alitas Ranch",
            description: "Alitas de pollo con salsa ranch, acompañadas de papas fritas",
            images: ["34dbad9c-87ee-44b0-8805-5325ac819aff.jpg"],
            price: 8.5,
            slug: "alitas_ranch",
        },
        {
            title: "Pollo asado con papas fritas",
            description: "1 Pollo entero asado, con salsas de la casa y 300gr de papas fritas",
            images: ["e1688a0a-16b3-4d04-b1e9-60e16f26ecf5.jpg"],
            price: 40,
            slug: "pollo_asado_y_papas_fritas",
        },
        {
            title: "Empanadas gordon blue",
            description: "6 empanadas 80gr de queso y 30gr de jamon, 50gr de pollo esmechado con salsa de ajo y guasacaca",
            images: ["9f946c72-e494-43dd-af97-d0383333b610.webp"],
            price: 12,
            slug: "empanada_gordon_blue",
        },
        {
            title: "Pure de papa con muslo de pollo frito",
            description: "200gr de pure de papa, con muslo de pollo",
            images: ["652c5f4e-abbd-46ab-8d4b-4a634e467e31.jpg"],
            price: 12,
            slug: "pure_papa_muslo_pollo_frito",
        },
        {
            title: "Hamburguesa Pollo Crispy",
            description: "Pan de hamburguesa, 150gr de pollo crispy, tomate, cebolla, papas fritas, lechuga y pepinillos",
            images: ["59a491d9-1f67-4e25-b282-64250cfee278.webp"],
            price: 20,
            slug: "hamburgesa_pollo_crispy",
        },
        {
            title: "Arepa con pescado frito",
            description: "150gr de harina, con pescado, platano frito y vegetales",
            images: ["e6763885-5c1d-4531-9d7a-ce4d00ad7bf4.jpg"],
            price: 25,
            slug: "arepa_con_pescado_frito",
        },
        {
            title: "Arepas fritas con queso",
            description: "150gr de harina pan, con 70gr de queso",
            images: ["a3f3cb4b-bf7d-4b94-bf81-1e29bbc3fa1b.jpg"],
            price: 10,
            slug: "arepas_fritas_con_queso",
        },
        {
            title: "Pasticho Familiar",
            description: "600 g de carne picada de ternera. 6 cucharadas de aceite de oliva. Sal. Pimienta negra molida. 1 cebolla grande. 2 o 3 dientes de ajo. 200 ml de vino tinto. 800 g de tomate triturado.",
            images: ["577537d8-44e2-4748-9d13-af6f7d0f8ff7.jpg"],
            price: 50,
            slug: "pasticho",
        },
        {
            title: "Hamburguesa Doble Cheese",
            description: "Pan de hamburguesa, doble carne 240g, doble queso, tocineta, pepinillo y salsa de la casa",
            images: ["11f84c94-e72b-4d3d-8f7a-1fd688fdaeaa.jpg"],
            price: 7,
            slug: "doble_cheese",
        },
        {
            title: "Pepito",
            description: "Pan jumbo (40cm) papas, carne, pollo, calabresa, queso amarillo, vegetales salsas de la casa",
            images: ["4fa19f17-ca06-4290-863b-baa211828ac8.jpg"],
            price: 10,
            slug: "pepito",
        },
        {
            title: "Club House",
            description: "Pechuga de pollo, huevo, queso amarillo, jamón, vegetales, salsas de la casa",
            images: ["c02098c5-843e-477d-aae7-715d0945cd75.jpg"],
            price: 7,
            slug: "club_house",
        },
        {
            title: "Agua Minalba",
            description: "Agua Minalba 600ml",
            images: ["f2853917-f8bf-4a42-90d7-64001c0bcfb0.jpg"],
            price: 2,
            slug: "agua_minalba",
        },
        {
            title: "Malta en lata",
            description: "MaLta en lata maltín polar 250ml",
            images: ["acef0eec-0fe8-47ab-8813-4de5765d2521.png"],
            price: 3,
            slug: "malta_en_lata",
        },
        {
            title: "Refresco Coca-Cola",
            description: "2 Litros de refresco Coca-Cola",
            images: ["2673e7df-9adc-4773-836d-471c016c74e9.jpeg"],
            price: 4,
            slug: "refresco_coca_cola",
        },
        {
            title: "Refresco Pepsi",
            description: "2 Litros de refresco Pepsi",
            images: ["34d6c507-67b2-4489-8870-37e08ec27ff3.webp"],
            price: 3.5,
            slug: "refresco_pepsi",
        },
        {
            title: "Jugo de Naranja Natural",
            description: "Jugo de naranja en jarrón de vidrio 1.5 Litros",
            images: ["9e44e95b-7533-4811-ac4f-06eaa8f0a91e.jpg"],
            price: 2.5,
            slug: "jugo_de_naranja",
        },
        {
            title: "Limonada",
            description: "Limonada Fria en jarrón de vidrio 1.5 litros",
            images: ["231961a1-3847-4a9d-8322-aa28d3c799f1.jpg"],
            price: 2.9,
            slug: "limonada",
        },
        {
            title: "Agua Minalba 1-5 litros",
            description: "Agua minalba 1.5 litros",
            images: ["43212a3b-02ac-43a4-aac8-df2c2837c842.jpg"],
            price: 3,
            slug: "agua_minalba_1.5_litros",
        },
        {
            title: "Malta en botella de vidrio",
            description: "Malta en botella de vidrio 250ml",
            images: ["06f8d4b2-7431-45ed-91e1-93e5d18c7a4d.jpeg"],
            price: 3.5,
            slug: "malta_en_botella_de_vidrio",
        },
        {
            title: "Jugo de fresa",
            description: "Jugo de fresa en jarrón de vidrio 1.5 litros",
            images: ["2017c11d-05ab-452a-95bf-dae18b3e6f75.jpg"],
            price: 2.5,
            slug: "jugo_fresa",
        },
        {
            title: "Jugo de parchita",
            description: "jugo de parchita en jarrón de vidrio 1.5 litros",
            images: ["850241ce-7edc-43f8-82e8-daa184e3dd24.jpg"],
            price: 2.4,
            slug: "jugo_parchita",
        },
        {
            title: "Refresco Frescolita",
            description: "Refresco Frescolita 2 Litros",
            images: ["c7056242-5d8a-4ebd-b11b-0c2df8375f3b.webp"],
            price: 3.2,
            slug: "refresco_frescolita",
        },
        {
            title: "Refresco Manzanita",
            description: "Refresco Manzanita Golden 1 Litros",
            images: ["61fb84fc-f319-4072-ab52-5516dc052757.jpeg"],
            price: 1.5,
            slug: "refresco_manzanita",
        },
        {
            title: "Refresco 7Up",
            description: "Refresco 7Up 2 litros",
            images: ["07dfb5fb-e268-4657-95d1-de446a117783.png"],
            price: 2.3,
            slug: "refresco_7up",
        },
        {
            title: "Neste sabor limon",
            description: "Neste sabor limon 1.5 Litros",
            images: ["d6cac519-fc69-4b3e-b6c5-66c5f33910bc.jpg"],
            price: 15,
            slug: "nestea_sabor_limon",
        },
        {
            title: "Barquilla de chocolate",
            description: "Barquilla con sabor de helado a chocolate",
            images: ["7508e364-0b66-4be5-9872-1b406c01936f.jpg"],
            price: 1.5,
            slug: "barquilla_chocolate",
        },
        {
            title: "Barquilla de fresa",
            description: "Barquilla con sabor de helado a fresa",
            images: ["89d92899-b482-4c1a-8ce1-aacf03297b0b.jpg"],
            price: 1.5,
            slug: "barquilla_fresa",
        },
        {
            title: "Barquilla de mantecado",
            description: "Barquilla con sabor de helado a mantecado",
            images: ["7aa80328-d9c0-4958-8e15-acb71c5ea770.jpg"],
            price: 1.5,
            slug: "barquilla_mantecado",
        },
        {
            title: "Barquilla de banana",
            description: "Barquilla con sabor de helado a banana",
            images: ["f91cc1a4-1278-4127-9a6d-0f9900eb970c.jpg"],
            price: 1.5,
            slug: "barquilla_banana",
        },
        {
            title: "Barquilla ron con pasa",
            description: "Barquilla con sabor de helado ron con pasa",
            images: ["d87bf261-212a-49d0-83ca-43b8cfd8b18f.webp"],
            price: 1.5,
            slug: "barquilla_ron_con_pasa",
        },
        {
            title: "Quesillo",
            description: "quesillo familiar para 4 personas, 400 g de leche condensada. 400 g de leche (preferiblente entera) 1 cucharada sopera de vainilla. 1 chorrito de ron. 1/2 taza de azucar.",
            images: ["89ff2449-5209-4463-8ae3-14c9b6c32b81.jpg"],
            price: 5,
            slug: "quesillo",
        },
        {
            title: "Torta de queso",
            description: "8 porsiones de torta de queso",
            images: ["8b37dc80-c43c-4bf7-92e8-2ebcdededeca.webp"],
            price: 20,
            slug: "torta_de_queso",
        },
        {
            title: "Marquesa de chocolate",
            description: "Marquesa de chocolate para 4 personas",
            images: ["f8af337b-132e-4fa3-a807-75aab8ce5cc9.jpg"],
            price: 8.5,
            slug: "marquesa_chocolate",
        },
        {
            title: "Brownie de chocolate",
            description: "Brownie de chocolate para 2 personas",
            images: ["5593093a-6430-425b-8c3d-97e07e1ae92d.jpg"],
            price: 6.2,
            slug: "brownie_chocolate",
        },
]
}