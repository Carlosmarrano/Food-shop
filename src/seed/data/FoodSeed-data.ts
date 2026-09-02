import * as bcrypt from 'bcrypt';
interface SeedFood {
    title: string;
    description: string;
    slug: string;
    price: number;
    images: string[];
    stock: number;
    available: boolean;
    category: string;
}

interface SeedUser {
    email: string
    fullName: string
    password: string
    roles: string[]
}

interface SeedData {
    users: SeedUser[];
    foods: SeedFood[];
}

export const initialFoodData: SeedData = {
    users: [
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
        },
        {
            email: 'test3@delivery.com',
            fullName: 'DeliveryTest',
            password: bcrypt.hashSync('Abc123', 10),
            roles: ['delivery']
        }
    ],
    foods: [
        {
            title: "Reina papeada",
            description: "Arepa con 150gr de harina pan, pollo esmechado, tomate, cebolla, ajo, aceite de oliva, sal, aguacate y queso rallado 50gr",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305649/qlccdka5tsvgfh8g25uh.webp"],
            price: 25,
            slug: "reina_papeada",
            stock: 50,
            available: true,
            category: "Comidas"
        },
        {
            title: "Empanadas de pollo",
            description: "80gr de pollo esmechado, con salsa de ajo y guasacaca",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788307722/on39btdhdcqcea4j89ff.webp"],
            price: 18,
            slug: "empanadas_de_pollo",
            stock: 50,
            available: true,
            category: "Comidas"
        },
        {
            title: "Pasta bolognesa",
            description: "150gr de pasta, salsa de tomate, 90gr de carne molida envuelta en salsa de tomate",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305659/mwtv0r5o0ehuk1iechjw.webp"],
            price: 15,
            slug: "pasta_bolognesa",
            stock: 50,
            available: true,
            category: "Comidas"
        },
        {
            title: "Hamburguesa Smash doble",
            description: "Pan de hamburguesa, 240gr de carne, tomate, cebolla, papas fritas, lechuga y pepinillos",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305656/vgzdc05ia0ky2xgmrful.webp"],
            price: 15,
            slug: "hamburgesa_smash",
            stock: 50,
            available: true,
            category: "Comidas"
        },
        {
            title: "Boca burguer",
            description: "Pan Brioche, carne de res, queso cheddar, lechuga, tomate, cebolla morada, salsas tradicionales",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305655/dknphzxqltaorvujxjkk.webp"],
            price: 19,
            slug: "boca_burger",
            stock: 50,
            available: true,
            category: "Comidas"
        },
        {
            title: "Alitas BBQ O Picantes",
            description: "Alitas de Pollo a la BBQ o Picantes acompoañadas de papas fritas",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305651/msqcs3hx7ppdjiskphdi.webp"],
            price: 9,
            slug: "alitas_bbq_o_picantes",
            stock: 50,
            available: true,
            category: "Comidas"
        },
        {
            title: "Tenders",
            description: "Deliciosos tenders de pollo acompñado de papas fritas",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305648/ougd8o0b9vmxooneekdh.webp"],
            price: 7,
            slug: "tenders",
            stock: 50,
            available: true,
            category: "Comidas"
        },
        {
            title: "Parripapas",
            description: "350gr de papas fritas, queso fundido, crujientes tocinetas troceadas",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305650/d83defgykj11gbqmbbsr.webp"],
            price: 8,
            slug: "parripapas",
            stock: 50,
            available: true,
            category: "Comidas"
        },
        {
            title: "Ensalada César",
            description: "Lechuga Romana, aderezo césar, crutones, tocineta toceadas y queso pecorino",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305642/t2oqqxaevziqg5l57o8x.webp"],
            price: 10,
            slug: "ensalada_c_esar",
            stock: 50,
            available: true,
            category: "Comidas"
        },
        {
            title: "Alitas Ranch",
            description: "Alitas de pollo con salsa ranch, acompañadas de papas fritas",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305662/fjyjmszi3faqhou7ptrh.webp"],
            price: 8.5,
            slug: "alitas_ranch",
            stock: 50,
            available: true,
            category: "Comidas"
        },
        {
            title: "Pollo asado con papas fritas",
            description: "1 Pollo entero asado, con salsas de la casa y 300gr de papas fritas",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305653/kw9hxgctfrhopteaoxve.webp"],
            price: 40,
            slug: "pollo_asado_y_papas_fritas",
            stock: 50,
            available: true,
            category: "Comidas"
        },
        {
            title: "Empanadas gordon blue",
            description: "6 empanadas 80gr de queso y 30gr de jamon, 50gr de pollo esmechado con salsa de ajo y guasacaca",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305660/yl4j8nflwtvufx9q0wlw.webp"],
            price: 12,
            slug: "empanada_gordon_blue",
            stock: 50,
            available: true,
            category: "Comidas"
        },
        {
            title: "Pure de papa con muslo de pollo frito",
            description: "200gr de pure de papa, con muslo de pollo",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305643/ltod3xo9esdmyhbrus5w.webp"],
            price: 12,
            slug: "pure_papa_muslo_pollo_frito",
            stock: 50,
            available: true,
            category: "Comidas"
        },
        {
            title: "Hamburguesa Pollo Crispy",
            description: "Pan de hamburguesa, 150gr de pollo crispy, tomate, cebolla, papas fritas, lechuga y pepinillos",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305662/yfsuycuwfny9t322ekz2.webp"],
            price: 20,
            slug: "hamburgesa_pollo_crispy",
            stock: 50,
            available: true,
            category: "Comidas"
        },
        {
            title: "Arepa con pescado frito",
            description: "150gr de harina, con pescado, platano frito y vegetales",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305653/tugkicljtnrketransse.webp"],
            price: 25,
            slug: "arepa_con_pescado_frito",
            stock: 50,
            available: true,
            category: "Comidas"
        },
        {
            title: "Arepas fritas con queso",
            description: "150gr de harina pan, con 70gr de queso",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305648/mrqlhdiektpj4bfumywy.webp"],
            price: 10,
            slug: "arepas_fritas_con_queso",
            stock: 50,
            available: true,
            category: "Comidas"
        },
        {
            title: "Pasticho Familiar",
            description: "600 g de carne picada de ternera. 6 cucharadas de aceite de oliva. Sal. Pimienta negra molida. 1 cebolla grande. 2 o 3 dientes de ajo. 200 ml de vino tinto. 800 g de tomate triturado.",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305646/rwc9xok8hyfemu8roewu.webp"],
            price: 50,
            slug: "pasticho",
            stock: 50,
            available: true,
            category: "Comidas"
        },
        {
            title: "Hamburguesa Doble Cheese",
            description: "Pan de hamburguesa, doble carne 240g, doble queso, tocineta, pepinillo y salsa de la casa",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305661/pzt9sqytvgvrbamxcgma.webp"],
            price: 7,
            slug: "doble_cheese",
            stock: 50,
            available: true,
            category: "Comidas"
        },
        {
            title: "Pepito",
            description: "Pan jumbo (40cm) papas, carne, pollo, calabresa, queso amarillo, vegetales salsas de la casa",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305658/ppnfomjhulb3izfdpjfp.webp"],
            price: 10,
            slug: "pepito",
            stock: 50,
            available: true,
            category: "Comidsa"
        },
        {
            title: "Club House",
            description: "Pechuga de pollo, huevo, queso amarillo, jamón, vegetales, salsas de la casa",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305650/fidf7483icbkggn1pmp3.webp"],
            price: 7,
            slug: "club_house",
            stock: 50,
            available: true,
            category: "Comidas"
        },
        {
            title: "Agua Minalba",
            description: "Agua Minalba 600ml",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305656/r891opfadag0uwwzggta.webp"],
            price: 2,
            slug: "agua_minalba",
            stock: 50,
            available: true,
            category: "Bebidas"
        },
        {
            title: "Malta en lata",
            description: "MaLta en lata maltín polar 250ml",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305649/fvjpgef4kmmkcndri3zz.webp"],
            price: 3,
            slug: "malta_en_lata",
            stock: 50,
            available: true,
            category: "Bebidas"
        },
        {
            title: "Refresco Coca-Cola",
            description: "2 Litros de refresco Coca-Cola",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305644/stfj22iiogc3xyghbpcg.webp"],
            price: 4,
            slug: "refresco_coca_cola",
            stock: 50,
            available: true,
            category: "Bebidas"
        },
        {
            title: "Refresco Pepsi",
            description: "2 Litros de refresco Pepsi",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305661/ua5vkedod0oncanfairj.webp"],
            price: 3.5,
            slug: "refresco_pepsi",
            stock: 50,
            available: true,
            category: "Bebidas"
        },
        {
            title: "Jugo de Naranja Natural",
            description: "Jugo de naranja en jarrón de vidrio 1.5 Litros",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305660/s2q2n9aushapesew3ovr.webp"],
            price: 2.5,
            slug: "jugo_de_naranja",
            stock: 50,
            available: true,
            category: "Bebidas"
        },
        {
            title: "Limonada",
            description: "Limonada Fria en jarrón de vidrio 1.5 litros",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305646/ah4myq6aw8zz1ngfhi6r.webp"],
            price: 2.9,
            slug: "limonada",
            stock: 50,
            available: true,
            category: "Bebidas"
        },
        {
            title: "Agua Minalba 1-5 litros",
            description: "Agua minalba 1.5 litros",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305645/amoia0svfzqtdxe5ie2d.webp"],
            price: 3,
            slug: "agua_minalba_1.5_litros",
            stock: 50,
            available: true,
            category: "Bebidas"
        },
        {
            title: "Malta en botella de vidrio",
            description: "Malta en botella de vidrio 250ml",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305657/bvuilntwcij49yzlv1wm.webp"],
            price: 3.5,
            slug: "malta_en_botella_de_vidrio",
            stock: 50,
            available: true,
            category: "Bebidas"
        },
        {
            title: "Jugo de fresa",
            description: "Jugo de fresa en jarrón de vidrio 1.5 litros",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305644/emlnpmnndqlga5cg2roo.webp"],
            price: 2.5,
            slug: "jugo_fresa",
            stock: 50,
            available: true,
            category: "Bebidas"
        },
        {
            title: "Jugo de parchita",
            description: "jugo de parchita en jarrón de vidrio 1.5 litros",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305647/wocidd7dlgketjp4jd4h.webp"],
            price: 2.4,
            slug: "jugo_parchita",
            stock: 50,
            available: true,
            category: "Bebidas"
        },
        {
            title: "Refresco Frescolita",
            description: "Refresco Frescolita 2 Litros",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305651/gknxxhrhhufslqe6uuf4.webp"],
            price: 3.2,
            slug: "refresco_frescolita",
            stock: 50,
            available: true,
            category: "Bebidas"
        },
        {
            title: "Refresco Manzanita",
            description: "Refresco Manzanita Golden 1 Litros",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305663/yfry82s8llgyv391wzqw.webp"],
            price: 1.5,
            slug: "refresco_manzanita",
            stock: 50,
            available: true,
            category: "Bebidas"
        },
        {
            title: "Refresco 7Up",
            description: "Refresco 7Up 2 litros",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305658/gmsjwhjf6nv36fodmovc.webp"],
            price: 2.3,
            slug: "refresco_7up",
            stock: 50,
            available: true,
            category: "Bebidas"
        },
        {
            title: "Neste sabor limon",
            description: "Neste sabor limon 1.5 Litros",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305652/c05d1ocnq1qb902czfrx.webp"],
            price: 15,
            slug: "nestea_sabor_limon",
            stock: 50,
            available: true,
            category: "Bebida"
        },
        {
            title: "Barquilla de chocolate",
            description: "Barquilla con sabor de helado a chocolate",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305645/q5fh2fi4fesbsjtwxq9k.webp"],
            price: 1.5,
            slug: "barquilla_chocolate",
            stock: 50,
            available: true,
            category: "Postres"
        },
        {
            title: "Barquilla de fresa",
            description: "Barquilla con sabor de helado a fresa",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305642/zo6zul6n1ntpsur6xckz.webp"],
            price: 1.5,
            slug: "barquilla_fresa",
            stock: 50,
            available: true,
            category: "Postres"
        },
        {
            title: "Barquilla de mantecado",
            description: "Barquilla con sabor de helado a mantecado",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305657/bt8zkutfw4wnk1plck8j.webp"],
            price: 1.5,
            slug: "barquilla_mantecado",
            stock: 50,
            available: true,
            category: "Postres"
        },
        {
            title: "Barquilla de banana",
            description: "Barquilla con sabor de helado a banana",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305655/wvfrwn2wvt06ml7yyvsi.webp"],
            price: 1.5,
            slug: "barquilla_banana",
            stock: 50,
            available: true,
            category: "Postres"
        },
        {
            title: "Barquilla ron con pasa",
            description: "Barquilla con sabor de helado ron con pasa",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305652/cmu70nlcrql1a8s6uvwo.webp"],
            price: 1.5,
            slug: "barquilla_ron_con_pasa",
            stock: 50,
            available: true,
            category: "Postres"
        },
        {
            title: "Quesillo",
            description: "quesillo familiar para 4 personas, 400 g de leche condensada. 400 g de leche (preferiblente entera) 1 cucharada sopera de vainilla. 1 chorrito de ron. 1/2 taza de azucar.",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305643/okyvv2icr0go5zhlpar5.webp"],
            price: 5,
            slug: "quesillo",
            stock: 50,
            available: true,
            category: "Postres"
        },
        {
            title: "Torta de queso",
            description: "8 porsiones de torta de queso",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788307721/j3plflol6tkanhjgdfcr.webp"],
            price: 20,
            slug: "torta_de_queso",
            stock: 50,
            available: true,
            category: "Postres"
        },
        {
            title: "Marquesa de chocolate",
            description: "Marquesa de chocolate para 4 personas",
            images: ["https://res.cloudinary.com/dsauanbq4/image/upload/v1788305654/drm8ff5b9yijb2myajjf.webp"],
            price: 8.5,
            slug: "marquesa_chocolate",
            stock: 50,
            available: true,
            category: "Postres"
        },
        {
            title: "Brownie de chocolate",
            description: "Brownie de chocolate para 2 personas",
            images: ["5593093a-6430-425b-8c3d-97e07e1ae92d.jpg"],
            price: 6.2,
            slug: "https://res.cloudinary.com/dsauanbq4/image/upload/v1788305647/hjcxfwxtuxdcoscrexwk.webp",
            stock: 50,
            available: true,
            category: "Postres"
        },
    ]
}