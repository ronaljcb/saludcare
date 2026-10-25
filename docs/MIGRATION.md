# Recuperación de SaludCare

## Antes

El frontend utilizaba direcciones fijas de AWS que ya no permiten recorrer el proyecto de forma independiente.

## Edición de portafolio

Se conserva el frontend original y se añade un adaptador de demostración que respeta los contratos usados por la interfaz. La persistencia es local y por navegador. Las llamadas de negocio de la demo no llegan a AWS. Las imágenes, fuentes y mapas pueden consultar proveedores externos.

Se conservan los microservicios de pacientes, consultas, exámenes y orquestación. Vercel publica la exportación estática de Next.js en `Frontend/out`. Los microservicios y sus bases de datos no se ejecutan en el despliegue de demostración.

## Volver a un backend real

El modo real de los archivos originales necesita servicios activos y sustitución de sus antiguas direcciones por endpoints HTTPS configurables. Desactivar el modo demo por sí solo no recupera los servicios ni una base de datos. Mantén el modo demo hasta implementar y verificar ese trabajo.

## Límites

El inicio de sesión de demostración no protege datos ni representa autenticación segura. El registro usa datos ficticios y no guarda contraseñas. No se envían correos, no se cobran compras y no se restauran datos de pacientes o usuarios. La aplicación es una muestra interactiva para el perfil.
