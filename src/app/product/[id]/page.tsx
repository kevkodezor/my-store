import { getProductById } from '@/actions/products';
import { DetailProduct } from './Detail';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {

    const { id } = await params;

    const product = await getProductById(id);

    return (
        <DetailProduct product={product} />
    );
}