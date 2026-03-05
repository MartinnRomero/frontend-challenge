import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateProductVariant, type ProductVariant } from '../../hooks/useProductVariants';
import './CreateProductVariantPage.css';

const productVariantSchema = z.object({
  productId: z
    .number()
    .int()
    .positive('El ID de producto es obligatorio'),
  sizeCode: z
    .string()
    .min(1, 'El código de talle es obligatorio')
    .max(7, 'Máximo 7 caracteres'),
  colorName: z
    .string()
    .min(1, 'El color es obligatorio')
    .max(30, 'Máximo 30 caracteres'),
  imageUrls: z.string().min(1, 'Agregá al menos una URL de imagen'),
});

export type ProductVariantFormValues = z.infer<typeof productVariantSchema>;

export function CreateProductVariantPage() {
  const { post } = useCreateProductVariant();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductVariantFormValues>({
    resolver: zodResolver(productVariantSchema),
    defaultValues: {
      productId: 0,
      sizeCode: '',
      colorName: '',
      imageUrls: '',
    },
  });

  const onSubmit = async (values: ProductVariantFormValues) => {
    const imageUrlsArray = values.imageUrls
      .split(',')
      .map((url) => url.trim())
      .filter(Boolean);

    const payload: ProductVariant = {
      productId: values.productId,
      sizeCode: values.sizeCode,
      colorName: values.colorName,
      imageUrls: imageUrlsArray,
    };

    await post(payload);
  };

  return (
    <section className="create-product-variant-page">
      <h2 className="page-title">Crear variante de producto</h2>
      <form
        className="create-product-variant-grid"
        onSubmit={handleSubmit(onSubmit)}
      >
        <article className="create-product-variant-card">
          <div className="create-product-variant-card__body">
            <label htmlFor="productId">
              ID de producto
              <input
                id="productId"
                placeholder="Ejemplo: 1"
                type="number"
                {...register('productId', { valueAsNumber: true })}
              />
              {errors.productId && (
                <p className="field-error">{errors.productId.message}</p>
              )}
            </label>

            <label htmlFor="sizeCode">
              Código de talle
              <input id="sizeCode" placeholder="Ejemplo: S" type="text" {...register('sizeCode')} />
              {errors.sizeCode && (
                <p className="field-error">{errors.sizeCode.message}</p>
              )}
            </label>

            <label htmlFor="colorName">
              Color
              <input id="colorName" placeholder="Ejemplo: red" type="text" {...register('colorName')} />
              {errors.colorName && (
                <p className="field-error">{errors.colorName.message}</p>
              )}
            </label>

            <label htmlFor="imageUrls">
              URLs de imágenes
              <textarea
                id="imageUrls"
                placeholder="Ejemplo: https://example.com/image1.jpg, https://example.com/image2.jpg"
                {...register('imageUrls')}
              />
              {errors.imageUrls && (
                <p className="field-error">{errors.imageUrls.message}</p>
              )}
            </label>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creando...' : 'Crear variante'}
            </button>
          </div>
        </article>
      </form>
    </section>
  );
}

