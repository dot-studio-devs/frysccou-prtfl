---
title: "Arquitectura Hexagonal en el Frontend: ¿Moda o Necesidad?"
summary: "Llevo más de un año aplicando Arquitectura Hexagonal en proyectos frontend. Acá te cuento qué aprendí, qué funcionó, qué no, y cuándo tiene sentido aplicarla — y cuándo es overkill puro."
coverImage: "/blog/covers/hexagonal-arch.jpg"
publishedAt: "2026-02-15"
tags: ["Arquitectura", "Frontend", "Clean Code", "TypeScript", "Opinión"]
author:
  name: "Francisco Espindola"
  role: "Web Engineer"
  avatar: "/ysc.png"
  social: "https://github.com/frysccou"
lang: "es"
featured: true
readingTime: 12
---

## El problema que vine a resolver

Trabajé en un proyecto de e-commerce mediano. Después de 8 meses, el componente de checkout había crecido a **más de 1500 líneas**. La lógica de negocio estaba mezclada con el estado de React, los llamados a la API, y los estilos. Agregar una feature nueva era un ejercicio de horror.

Fue ahí cuando empecé a preguntarme: ¿cómo aplicamos en el frontend los mismos principios de separación de responsabilidades que llevamos años usando en el backend?

## ¿Qué es la Arquitectura Hexagonal?

Popularizada por Alistair Cockburn en 2005, la idea central es simple: **el núcleo de tu aplicación no debería saber nada del mundo exterior**.

```
[UI / APIs / DB]  →  [Puertos]  →  [Dominio]  ←  [Puertos]  ←  [Infraestructura]
```

En lugar de que tus componentes llamen directamente a `fetch('/api/products')`, definen un **puerto** (una interfaz) que expresa lo que necesitan. La implementación concreta de ese puerto — ya sea una llamada REST, un mock para tests, o datos locales — es un detalle de infraestructura.

## Cómo lo apliqué en un proyecto Next.js

La estructura de carpetas que uso actualmente:

```
src/
  domain/
    entities/       # Tipos puros, sin dependencias
    use-cases/      # Lógica de negocio
    repositories/   # Interfaces (puertos)
  infrastructure/
    api/            # Implementaciones HTTP
    storage/        # localStorage, cookies
  application/
    hooks/          # React hooks que conectan dominio e infraestructura
  ui/
    components/     # Componentes "tontos", solo presentación
    pages/          # Páginas de Next.js
```

El punto más importante: los **use-cases** en `domain/` no importan nada de React, nada de `fetch`, nada de Next.js. Son TypeScript puro, testeable en aislamiento total.

## Un ejemplo concreto

```typescript
// domain/repositories/ProductRepository.ts
export interface ProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
}

// domain/use-cases/GetFeaturedProducts.ts
export class GetFeaturedProducts {
  constructor(private repo: ProductRepository) {}

  async execute(): Promise<Product[]> {
    const all = await this.repo.findAll();
    return all.filter((p) => p.isFeatured && p.stock > 0);
  }
}

// En React:
const products = await new GetFeaturedProducts(
  new ApiProductRepository(),
).execute();
```

¿Ven lo que pasa acá? Si mañana la API cambia — o si quiero testear sin tocar la red — simplemente inyecto una implementación diferente. El caso de uso no cambia.

## ¿Cuándo tiene sentido?

**Úsala cuando:**

- El proyecto va a vivir más de 6 meses
- Hay más de un developer involucrado
- La lógica de negocio es compleja y necesita tests unitarios serios
- Hay múltiples fuentes de datos o integraciones de terceros

**No la uses cuando:**

- Es un landing page o portfolio pequeño
- Estás prototipando y vas a tirar el código en 2 semanas
- El equipo no tiene experiencia con arquitecturas limpias (el costo de aprendizaje es alto)

## La parte difícil: el costo inicial

Implementar esto bien tiene un costo cognitivo alto al principio. Hay más archivos, más abstracciones, más cosas que entender antes de poder escribir una sola línea de UI. Para alguien nuevo al proyecto, la curva de aprendizaje puede ser frustrante.

Mi recomendación: empiézalo en verde. No intentes refactorizar una base de código existente de golpe — migrá por módulos, feature por feature.

## Conclusión

La Arquitectura Hexagonal en el frontend no es una moda. Es una herramienta con un costo y un beneficio bien definidos. Aplicarla donde corresponde — en proyectos complejos, de largo plazo, con equipos reales — puede ser la diferencia entre un sistema mantenible y uno que nadie quiere tocar.

El código es para humanos, no para máquinas. Escribí pensando en el próximo developer que va a leer tu trabajo. Muchas veces, ese developer sos vos mismo, seis meses después.
