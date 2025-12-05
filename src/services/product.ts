import { any, boolean } from "zod";
import { prisma } from "../libs/prisma";

type productFilters = {
  metadata?: { [key: string]: string };
  order?: string;
  limit?: number;
};
export const getAllProducts = async (filters: productFilters) => {
  let orderBy = {};
  switch (filters.order) {
    case "views":
    default:
      orderBy = { views: "desc" };
      break;
    case "seeling":
      orderBy = { salesCount: "desc" };
      break;
    case "price":
      orderBy = { price: "asc" };
      break;
  }
  let where: any = {};
  if (filters.metadata && typeof filters.metadata === "object") {
    let metaFilters = [];
    for (let categoryMetadataId in filters.metadata) {
      const value = filters.metadata[categoryMetadataId];
      if (typeof value !== "string") continue;
      const valuesIds = value
        .split("|")
        .map((v) => v.trim())
        .filter(boolean);
      if (valuesIds.length === 0) continue;
      metaFilters.push({
        metadata: {
          some: {
            categoryMetadataId,
            metadataValueId: { in: valuesIds },
          },
        },
      });
    }
    if (metaFilters.length > 0) {
      where.AND = metaFilters;
    }
  }
  const products = await prisma.product.findMany({
    select: {
      id: true,
      label: true,
      price: true,
      images: {
        take: 1,
        orderBy: { id: "asc" },
      },
    },
    where,
    orderBy,
    take: filters.limit ?? undefined,
  });
  return products.map((product) => ({
    ...product,
    image: product.images[0] ? `media/products/${product.images[0].url}` : null,
    images: undefined,
  }));
};

export const getProduct = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      label: true,
      price: true,
      description: true,
      category: true,
      categoryId:true,
      images: true,
    },
  });
  if (!product) return null;

  return {
    ...product,
    images:
      product.images.length > 0
        ? product.images.map((img) => `media/products/${img.url}`)
        : [],
  };

};

export const incrementProductView=async(id:number)=>{
  await prisma.product.update({
    where:{id},
    data:{
      views:{increment:1}
    }
  })
}


export const getProductsFromSameCategoty = async(id: number,limit: number = 4)=>{
  const product =  await prisma.product.findUnique({
    where:{id},
    select:{
      categoryId:true
    }
  })
  if(!product) return []
  const products=await prisma.product.findMany({
    where:{
      categoryId:product.categoryId,
      id:{not:id}

    },
    select:{
      id:true,
      label:true,
      price:true,
      images:{
        take: 1,
        orderBy:{id:'asc'}
      }
    },
    take:limit,
    orderBy:{views:'desc'}
  })
  return products.map(product=>({
    ...product,
    image:product.images[0]? `media/products/${product.images[0]}.url`:null,
    images:undefined
  }))
}