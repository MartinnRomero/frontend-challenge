import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateProduct } from '../../hooks/useProducts';
import type { Product } from '../../types/product';
import './CreateProductPage.css';

const productFormSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio'),
  code: z.string().min(1, 'El código es obligatorio'),
  variationType: z.string().min(1, 'El tipo de variación es obligatorio'),
  details: z.object({
    category: z.string().min(1, 'La categoría es obligatoria'),
    capacity: z.number().nonnegative('La capacidad debe ser un número válido'),
    capacityUnit: z.enum(['GB', 'TB']),
    capacityType: z.enum(['SSD', 'HD']),
    brand: z.string().min(1, 'La marca es obligatoria'),
    series: z.string().min(1, 'La serie es obligatoria'),
  }),
  about: z.string().min(1, 'Agregá al menos un punto'),
  description: z.string().min(1, 'La descripción es obligatoria'),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;


export function CreateProductPage() {
  const { post } = useCreateProduct();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: '',
      code: '',
      variationType: '',
      details: {
        category: '',
        capacity: 0,
        capacityUnit: 'GB',
        capacityType: 'SSD',
        brand: '',
        series: '',
      },
      about: '',
      description: '',
    },
  });

  const onSubmit = async (values: ProductFormValues) => {
    const aboutArray = values.about
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const product: Product = {
      categoryId: 1,
      title: values.title,
      code: values.code,
      variationType: values.variationType,
      details: values.details,
      about: aboutArray,
      description: values.description,
    };

    console.log(product);

    await post(product);
    reset();
  };

  return (
    <section className="create-product-page">
      <h2 className="page-title">Crear producto</h2>
      <form className="create-product-grid" onSubmit={handleSubmit(onSubmit)}>
        <article className="create-product-card">
          <div className="create-product-card__body">
            <label htmlFor="title">
              Título
              <input id="title" placeholder="Ejemplo: Remera de algodón" type="text" {...register('title')} />
              {errors.title && <p className="field-error">{errors.title.message}</p>}
            </label>

            <label htmlFor="code">
              Código
              <input id="code" placeholder="Ejemplo: 1234567890" type="text" {...register('code')} />
              {errors.code && <p className="field-error">{errors.code.message}</p>}
            </label>

            <label htmlFor="variationType">
              Tipo de variación
              <input id="variationType" placeholder="Ejemplo: color" type="text" {...register('variationType')} />
              {errors.variationType && (
                <p className="field-error">{errors.variationType.message}</p>
              )}
            </label>

            <label htmlFor="category">
              Categoría
              <input id="category" placeholder="Ejemplo: Ropa" type="text" {...register('details.category')} />
              {errors.details?.category && (
                <p className="field-error">{errors.details.category.message}</p>
              )}
            </label>

            <label htmlFor="capacity">
              Capacidad
              <input
                id="capacity"
                placeholder="Ejemplo: 100"
                type="number"
                {...register('details.capacity', { valueAsNumber: true })}
              />
              {errors.details?.capacity && (
                <p className="field-error">{errors.details.capacity.message}</p>
              )}
            </label>

            <label htmlFor="capacityUnit">
              Unidad de capacidad
              <select id="capacityUnit" {...register('details.capacityUnit')}>
                <option value="GB">GB</option>
                <option value="TB">TB</option>
              </select>
              {errors.details?.capacityUnit && (
                <p className="field-error">{errors.details.capacityUnit.message}</p>
              )}
            </label>

            <label htmlFor="capacityType">
              Tipo de capacidad
              <select id="capacityType" {...register('details.capacityType')}>
                <option value="SSD">SSD</option>
                <option value="HD">HD</option>
              </select>
              {errors.details?.capacityType && (
                <p className="field-error">{errors.details.capacityType.message}</p>
              )}
            </label>

            <label htmlFor="brand">
              Marca
              <input id="brand" placeholder="Ejemplo: Nike" type="text" {...register('details.brand')} />
              {errors.details?.brand && (
                <p className="field-error">{errors.details.brand.message}</p>
              )}
            </label>

            <label htmlFor="series">
              Serie
              <input id="series" placeholder="Ejemplo: Air Force 1" type="text" {...register('details.series')} />
              {errors.details?.series && (
                <p className="field-error">{errors.details.series.message}</p>
              )}
            </label>

            <label htmlFor="about">
              Sobre el producto
              <textarea id="about" placeholder="Ejemplo: La remera es de algodón" {...register('about')} />
              {errors.about && <p className="field-error">{errors.about.message}</p>}
            </label>

            <label htmlFor="description">
              Descripción
              <textarea id="description" placeholder="Ejemplo: La remera es de algodón" {...register('description')} />
              {errors.description && (
                <p className="field-error">{errors.description.message}</p>
              )}
            </label>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creando...' : 'Crear producto'}
            </button>
          </div>
        </article>
      </form>
    </section>
  );
}
