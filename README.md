# Vixti — Gestor de Tareas (React Native + Expo)

Aplicación móvil simple y funcional para gestionar tareas personales.  

[GitHub Kevin Diaz](https://github.com/kevindiazistea/vixti)

[Video Kevin Diaz v1](https://youtube.com/shorts/-nWMfSNlVbo)

[Video Kevin Diaz v2](https://youtube.com/shorts/h8VwGr9rejg)

## Tecnologías utilizadas

- **React Native**
- **Expo SDK 54**
- **TypeScript**
- **AsyncStorage**
- **Zustand**
- **React Navigation**
- **Expo Contacts**
- **Expo Calendar**
- **Expo Notifications**
- **Expo Location**
- **Expo Image Picker**
- **Expo Camera**

## Estructura del proyecto

- /src
- /screens        → Pantallas principales
- /components     → Componentes reutilizables
- /storage        → AsyncStorage
- /navigation     → Navegacion de la aplicacion
- /test           → 3 test
- /services       → Servicios externos (Expo)
- /store          → Estado global de Zustand
- /style          → Estilos, fuentes
- /theme          → Colores
- App.tsx         → Navegación principal
- package.json    → Version SDK 54

## Cómo ejecutar el proyecto desde una terminal

 Instalar dependencias:

- npm install

 Iniciar apliacaion:

- npx expo start

 Levantar emulador:

- **a** → Android Studio  
- **o** escanear QR desde la app "Expo Go"

## Cómo ejecutar los test

Raiz del proyecto, con una terminal

- npm test

## La aplicacion gestor de tareas, nos debe permitir

- *Crear usuario*
- *Loguearse con el usuario*
- Notificarnos la tarea a realizar
- Enocontrarse en *Home*, con la posiblidad de *Ver* las tareas *Completadas* o *Eliminadas* y/o *Agregar o Eliminar tareas*. Ademas de *Cerrar Sesion*.
- *Nuevas funcionalidades* al crear una tarea, como*tomar una foto o ingresar desde galeria*.
- Agregar la *ubicacion* desde donde se realiza la tarea.
- Agregar un *contacto* de referencia.
- Agregar en el *calendario* del dispositivo la tarea a realizar.
- *Update del temporizador*, tanto la frecuencia horaria como de fechas.

## Uso de Inteligencia Artificial

Durante el desarrollo se utilizó **Microsoft Copilot** para:

- Generar versiones iniciales de funciones auxiliares (helpers)
- Mejorar la legibilidad de componentes
- Crear servicios reutilizables (ej: calendarioService.ts)

### Ejemplo del Prompt utilizado para utilizar el servicio de calendario

"Necesito que mi servicio de Expo Calendar para que sea más profesional, pida permisos correctamente, obtenga el calendario editable y cree eventos con alarma. Debe ser compatible con Expo 54. Usandolo desde Expo Go desde la aplicacion”

*Resultado:*
Se generó una versión más robusta del archivo calendarioService.ts, con el uso de permisos y selección automática del calendario.

*Mediante prompts efectivos, los cuales contaron con:*

- Contexto previo (Explicar que hace la app - Vixti)
- Ejemplos tanto de las clases como del proyecto (En este caso se compartio el ejemplo visto en clase de Expo - Calendar)
- Restricciones (SDK 54)
- Objetivo claro (Pedir lo que realmente necesitabamos, integrar este nuevo expo con SDK 54)

## Autor

Kevin Díaz

*Parcial 1 — Apps Móviles (ISTEA)*

*Parcial 2 — Apps Móviles (ISTEA)*
