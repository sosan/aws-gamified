
/* ======================================================================
   AWS SKILL TREE RPG  ·  single-file arcade learning game
   1) datos:  BANK (preguntas heredadas), REALMS y NODES
   2) motor:  combate, árbol, economía y pantallas
   ====================================================================== */

/* ======================================================================
   FORMAT: pregunta = [texto, "opción A|opción B|opción C|opción D", idx, explicación]
   nodo.q admite tuplas Y marcadores "Tema:5" que toman preguntas de BANK
   ====================================================================== */

/* ---------- LAMBDA: banco heredado de lambda_quiz.html (51 preguntas) ---------- */
const BANK = [
/* Introducción */
{t:"Introducción",q:"¿Qué es AWS Lambda?",o:["Un servicio de cómputo serverless basado en eventos","Una base de datos relacional gestionada","Un balanceador de carga para instancias EC2","Un CDN para servir contenido estático"],a:0,e:"Lambda ejecuta tu código en respuesta a eventos. AWS gestiona los servidores, el SO y el escalado por ti."},
{t:"Introducción",q:"¿Qué problema resolvió Lambda respecto a EC2?",o:["La gestión de infraestructura: provisionar, parchear y escalar servidores","El coste de la red de entrega de contenidos","El cifrado de datos en reposo","El versionado de bases de datos"],a:0,e:"Con EC2 tú gestionas AMIs, seguridad y escalado. Lambda elimina ese overhead: solo subes el código."},
{t:"Introducción",q:"¿Cómo factura Lambda a sus clientes?",o:["Por tiempo de cómputo en milisegundos","Por número de funciones creadas","Por GB almacenados al mes","Por horas de instancia activa"],a:0,e:"Pagas por requests y por GB-segundo (memoria × duración), redondeado al milisegundo."},
{t:"Introducción",q:"¿En qué año se lanzó AWS Lambda?",o:["2014","2010","2016","2018"],a:0,e:"Lambda se presentó en la re:Invent de 2014 y llegó a disponibilidad general en 2015."},
/* Límites */
{t:"Límites",q:"¿Cuál es el timeout máximo de una función Lambda?",o:["15 minutos","1 minuto","5 minutos","1 hora"],a:0,e:"El límite clásico es 15 minutos (para invocaciones síncronas). Puedes configurarlo desde 1 segundo."},
{t:"Límites",q:"¿Qué rango de memoria puedes asignar a una función?",o:["128 MB – 10 GB","64 MB – 1 GB","256 MB – 4 GB","512 MB – 2 GB"],a:0,e:"De 128 MB hasta 10.240 MB. La CPU asignada escala proporcionalmente con la memoria."},
{t:"Límites",q:"¿Cuál es el payload máximo de una invocación síncrona?",o:["6 MB","256 KB","50 MB","1 MB"],a:0,e:"6 MB para invocaciones síncronas; 256 KB para asíncronas. La respuesta también puede llegar a 6 MB."},
{t:"Límites",q:"¿Cuál es el tamaño máximo del ZIP desplegado directamente?",o:["50 MB","10 MB","250 MB","100 MB"],a:0,e:"50 MB comprimido directo (250 MB sin comprimir incluyendo capas; hasta 10 GB vía contenedor ECR)."},
{t:"Límites",q:"¿Cuál es la concurrencia por defecto en cada región?",o:["1.000 ejecuciones simultáneas","100 ejecuciones simultáneas","10.000 ejecuciones simultáneas","Ilimitada"],a:0,e:"El pool regional por defecto es de 1.000. Puedes pedir una subida de cuota."},
{t:"Límites",q:"¿Qué tamaño máximo tiene el almacenamiento efímero /tmp?",o:["10 GB","512 MB","1 GB","100 MB"],a:0,e:"De 512 MB a 10.240 MB. Es efímero: solo existe durante la vida del entorno."},
/* Concurrencia */
{t:"Concurrencia",q:"¿Qué devuelve Lambda cuando superas el límite de concurrencia?",o:["429 TooManyRequests","500 Internal Server Error","502 Bad Gateway","403 Forbidden"],a:0,e:"Throttle = HTTP 429. En invocaciones asíncronas se reintenta automáticamente con backoff."},
{t:"Concurrencia",q:"¿Qué garantiza la concurrencia reservada (Reserved Concurrency)?",o:["Un techo fijo de ejecuciones simultáneas para una función","Cero cold starts siempre","Acceso prioritario a la CPU","Más memoria para la función"],a:0,e:"Reserved fija un límite superior por función y la aísla del throttling causado por otras funciones."},
{t:"Concurrencia",q:"¿Para qué sirve Provisioned Concurrency?",o:["Inicializar entornos calientes y eliminar cold starts","Limitar el coste mensual","Enrutar tráfico entre versiones","Cifrar las variables de entorno"],a:0,e:"Mantiene N entornos preinicializados y listos para responder en milisegundos. Cuesta GB-s aunque no haya tráfico."},
{t:"Concurrencia",q:"¿Quién comparte el pool regional de 1.000 ejecuciones?",o:["Todas las funciones Lambda de tu cuenta en esa región","Solo las funciones de un mismo VPC","Todas las cuentas de AWS del planeta","Solo las funciones con Provisioned"],a:0,e:"El pool se reparte entre las funciones no reservadas de tu cuenta en cada región."},
/* Invocación */
{t:"Invocación",q:"¿Qué tipo de invocación espera el resultado en la respuesta HTTP?",o:["Síncrona (RequestResponse)","Asíncrona (Event)","Poll-based","Ninguna de las anteriores"],a:0,e:"La invocación síncrona bloquea hasta que la función termina. La usan API Gateway, ALB y el SDK."},
{t:"Invocación",q:"¿Cuál es un ejemplo de invocación asíncrona?",o:["Un objeto subido a S3","Una llamada directa al SDK","Una petición de API Gateway","Un request del ALB"],a:0,e:"S3, SNS y EventBridge invocan en modo asíncrono: Lambda encola el evento y responde de inmediato."},
{t:"Invocación",q:"¿Cuántas veces reintenta Lambda una invocación asíncrona fallida?",o:["2 veces (3 intentos en total)","0 veces","5 veces","Infinitas veces"],a:0,e:"Dos reintentos con backoff exponencial. Tras fallar, puedes enviar el error a Destinations."},
{t:"Invocación",q:"¿Qué fuentes usan invocación poll-based?",o:["SQS, DynamoDB Streams y Kinesis","API Gateway y ALB","S3 y SNS","CloudFront y Route 53"],a:0,e:"Lambda sondea los event-source mappings y procesa los mensajes en lotes. SQS tiene semántica at-least-once."},
/* Seguridad */
{t:"Seguridad",q:"¿Qué es el Execution Role de una función Lambda?",o:["El rol IAM que la función asume para hablar con otros servicios","El usuario root de la cuenta AWS","El rol de los administradores de la consola","Un rol solo de lectura para logs"],a:0,e:"Concede permisos para escribir logs, usar KMS, conectarse a la VPC o llamar a otros servicios."},
{t:"Seguridad",q:"¿Qué controla la resource-based policy de Lambda?",o:["Quién puede invocar la función","Cuánta memoria puede usar la función","Qué runtime puede ejecutar la función","Dónde se guardan los logs"],a:0,e:"Define qué identidades o servicios (S3, API GW, otra cuenta) tienen permiso para invocar."},
{t:"Seguridad",q:"¿Cómo accede una función Lambda a recursos de una VPC privada?",o:["Mediante ENIs (interfaces elásticas) en la subred","Por IP pública directa","Con una VPN configurada","No puede acceder nunca"],a:0,e:"Lambda crea ENIs en tus subredes privadas para alcanzar RDS, ElastiCache u otros servicios internos."},
{t:"Seguridad",q:"¿Cómo se cifran las variables de entorno con secretos?",o:["Con AWS KMS","Con TLS 1.3","Con cifrado AES por defecto sin clave","Con certificados ACM"],a:0,e:"Puedes cifrar las env vars con una clave KMS. Regla de oro: principio de menor privilegio."},
/* Observabilidad */
{t:"Observabilidad",q:"¿Qué métricas publica Lambda automáticamente en CloudWatch?",o:["Invocations, Errors, Throttles, Duration","CPU, memoria y red de la instancia","Requests por segundo del balanceador","Latencia DNS y TTFB"],a:0,e:"Son gratuitas y se agregan por minuto. No necesitas instrumentar nada para verlas."},
{t:"Observabilidad",q:"¿Qué servicio AWS permite trazas distribuidas de extremo a extremo?",o:["AWS X-Ray","AWS Config","CloudTrail","Trusted Advisor"],a:0,e:"X-Ray traza cada request a través de API GW, Lambda, DynamoDB… mostrando latencias y errores."},
{t:"Observabilidad",q:"¿Dónde aparecen los print() y console.log() de tu código?",o:["CloudWatch Logs","S3","DynamoDB","El bucket de CloudTrail"],a:0,e:"Los logs de stdout/stderr van a CloudWatch Logs automáticamente."},
/* Layers */
{t:"Layers",q:"¿Qué es un layer de Lambda?",o:["Un ZIP con dependencias y librerías reutilizables","Un tipo de instancia EC2","Un bucket S3 versionado","Una política IAM adjunta"],a:0,e:"Los layers comparten deps entre funciones sin duplicar código. Incluyen librerías, runtimes custom o agentes."},
{t:"Layers",q:"¿Cuántos layers puede tener una función como máximo?",o:["5","1","10","20"],a:0,e:"Hasta 5 capas. La suma ZIP de la función más las capas no puede superar 250 MB sin comprimir."},
{t:"Layers",q:"¿Cómo se versionan los layers?",o:["Son inmutables: cada publicación crea una versión nueva","Se sobreescriben con cada deploy","Solo pueden tener una versión","Se versionan en Git exclusivamente"],a:0,e:"Cada capa tiene ARNs por versión (…:layer:nombre:1). Actualizar el layer lo heredan todas las funciones."},
/* Microcontenedores */
{t:"Microcontenedores",q:"¿Qué tecnología de aislamiento usa Lambda?",o:["Micro-VMs basadas en Firecracker","Contenedores Docker tradicionales","KVM clásico con una VM por función","Namespaces de Linux sin VM"],a:0,e:"Firecracker, creado por AWS, lanza micro-VMs ligeras en milisegundos manteniendo fuerte aislamiento."},
{t:"Microcontenedores",q:"¿El directorio /tmp persiste entre invocaciones?",o:["Sí, mientras viva el entorno warm","No, se borra en cada invocación","Solo 24 horas","Depende del runtime"],a:0,e:"/tmp persiste dentro del mismo entorno warm y se comparte entre invocaciones, pero es efímero y desaparece al reciclarse."},
{t:"Microcontenedores",q:"¿Cómo desplegar tu función además de un ZIP?",o:["Con una imagen de contenedor desde ECR","Con un archivo .jar en S3","Con una plantilla de CloudFormation","Con un script en Lambda"],a:0,e:"Desde 2020 puedes empaquetar la función como imagen Docker (hasta 10 GB) alojada en Amazon ECR."},
/* Lambda@Edge */
{t:"Lambda@Edge",q:"¿Dónde se ejecutan las funciones Lambda@Edge?",o:["En los edge locations de CloudFront","En una región específica que eliges","En tu VPC privada","En instancias EC2 dedicadas"],a:0,e:"Corren junto al usuario final en los puntos de presencia de CloudFront, reduciendo latencia."},
{t:"Lambda@Edge",q:"¿Cuántos triggers tiene Lambda@Edge?",o:["4: viewer/origin × request/response","2: request y response","1: viewer request","6: uno por método HTTP"],a:0,e:"Viewer request, origin request, origin response y viewer response. Cubren todo el ciclo del CDN."},
{t:"Lambda@Edge",q:"¿Cuál es el límite de duración para triggers viewer?",o:["5 segundos","1 minuto","15 minutos","100 ms"],a:0,e:"5 s para viewer request/response; 30 s para origin. La respuesta no puede superar 1 MB."},
/* Serverless */
{t:"Serverless",q:"¿Qué escala Lambda automáticamente?",o:["De cero a miles de invocaciones paralelas","Solo hasta 100 invocaciones","Manual con Auto Scaling Groups","Nada, hay que provisionar"],a:0,e:"Cada evento crea o reutiliza entornos: de 0 a miles de ejecuciones concurrentes sin configuración."},
{t:"Serverless",q:"¿Cuál es el beneficio principal frente a correr tus propios servidores?",o:["No gestionar servidores, parches ni SO","Código en cualquier lenguaje sin límites","Cero latencia en todos los casos","Almacenamiento ilimitado"],a:0,e:"El modelo serverless elimina la gestión de infraestructura: AWS se encarga de todo el plano operativo."},
{t:"Serverless",q:"¿Qué afirmación sobre alta disponibilidad es cierta en Lambda?",o:["Es responsabilidad del servicio, con redundancia integrada","La configuras tú con zonas de disponibilidad","Necesitas un ALB con health checks","Solo funciona en una AZ"],a:0,e:"Lambda ofrece HA y tolerancia a fallos por diseño; tú solo escribes el código."},
/* Cold starts */
{t:"Cold starts",q:"¿Qué es un cold start?",o:["El arranque de un entorno nuevo para la primera invocación","Una función que devuelve un error 500","La desconexión de una VPC","El reinicio de una base de datos"],a:0,e:"Descarga del código, inicialización del runtime e imports antes de ejecutar el handler. ~100 ms a 2 s+."},
{t:"Cold starts",q:"¿Qué opción elimina prácticamente los cold starts?",o:["Provisioned Concurrency","Reserved Concurrency","Un layer con el código","Una función URL"],a:0,e:"Provisioned mantiene entornos calientes preinicializados. SnapStart (Java/.NET) también los reduce drásticamente."},
{t:"Cold starts",q:"¿Cuál es típicamente la fase más costosa del cold start?",o:["La carga de dependencias (imports)","El arranque del sistema operativo","La creación del DNS","La autenticación IAM"],a:0,e:"Inicializar runtime y, sobre todo, importar librerías pesadas domina el tiempo. Por eso se inicializa fuera del handler."},
/* Internals */
{t:"Internals",q:"¿Cuántos requests procesa a la vez un micro-contenedor Lambda?",o:["Uno solo","Dos","Diez","Ilimitados"],a:0,e:"Cada entorno procesa un único request a la vez. La concurrencia = número de entornos. Ráfagas mayores crean nuevos entornos (cold)."},
{t:"Internals",q:"¿Las funciones Lambda son stateful o stateless?",o:["Stateless: el estado vive en /tmp o en servicios externos","Stateful: el estado persiste entre invocaciones","Solo son stateful en Java","Depende de la región"],a:0,e:"Lambda no garantiza persistencia: el entorno puede reciclarse. Guarda estado en DynamoDB, S3 o Redis."},
/* Handler */
{t:"Handler",q:"¿Cuál es la firma típica del handler en Python?",o:["def handler(event, context):","def main(request, response):","def lambda_run(data):","def execute(payload):"],a:0,e:"Lambda invoca el handler con el evento (JSON del trigger) y el context (metadatos de runtime)."},
{t:"Handler",q:"¿Qué contiene el objeto context?",o:["Metadatos: ARN, request ID, timeout, memoria restante","El body del evento original","Las credenciales de la cuenta root","El resultado de la invocación anterior"],a:0,e:"Context trae identidad de la función, límite de memoria restante, request ID y tiempo restante."},
{t:"Handler",q:"¿Cuándo se ejecuta el código fuera del handler?",o:["Una sola vez por entorno (init)","En cada invocación","Nunca","Solo en cold starts y warm starts"],a:0,e:"El código de nivel superior corre en la fase de init: ideal para imports y conexiones. No se factura en invocaciones warm."},
/* Versioning */
{t:"Versioning",q:"¿Qué crea aws lambda publish-version?",o:["Una versión inmutable del código y configuración","Un alias temporal","Un deploy en caliente a producción","Un backup en S3"],a:0,e:"Cada publish congela un snapshot inmutable con ARN propio. $LATEST sigue siendo el código editable."},
{t:"Versioning",q:"¿Qué es $LATEST?",o:["La versión editable a la que apuntas al modificar la función","La versión estable en producción","El alias por defecto de CodeDeploy","El ARN de la última capa"],a:0,e:"$LATEST siempre apunta al código editable actual. v1, v2… son los snapshots publicados."},
{t:"Versioning",q:"¿Para qué sirve un alias en Lambda?",o:["Puntero estable a una versión; URL de invocación inmutable","Para cambiar el runtime de la función","Para cifrar variables de entorno","Para limitar el timeout"],a:0,e:"El alias (p. ej. prod → v7) no cuesta y permite canary/blue-green con weighted routing sin tocar las URLs."},
{t:"Versioning",q:"¿Qué estrategia de despliegue gestiona CodeDeploy con Lambda?",o:["Linear, canary y all-at-once","Solo blue-green","Solo rolling con EC2","Rollback manual obligatorio"],a:0,e:"CodeDeploy reparte tráfico entre versiones según reglas y puede hacer rollback automático por alarmas."},
/* Destinations */
{t:"Destinations",q:"¿Qué enrutan las Destinations de Lambda?",o:["El resultado de invocaciones asíncronas: éxito o fallo","Las peticiones HTTP entrantes","Los logs de CloudWatch","El tráfico del API Gateway"],a:0,e:"Configuras onSuccess y onFailure para enviar la respuesta o el error a otro servicio sin código extra."},
{t:"Destinations",q:"¿A qué servicios puede enviar una Destination?",o:["SQS, SNS, EventBridge u otra función Lambda","Solo a S3","Solo a DynamoDB","A cualquier endpoint HTTP público"],a:0,e:"Cuatro destinos: SQS, SNS, EventBridge y Lambda. Sustituyen al patrón try/catch → SNS dentro del código."},
{t:"Destinations",q:"¿Las Destinations funcionan con invocaciones síncronas?",o:["No, solo asíncronas y event-source mappings","Sí, siempre","Solo con API Gateway","Solo con CloudFront"],a:0,e:"Solo aplican a invocaciones async y poll-based. En modo síncrono gestionas el resultado en tu código."}
];

/* ---------- REINOS ---------- */
const REALMS = [
  {id:"fnd", name:"Fundamentos de la Nube", sprite:"☁️", color:"#FF9900",
   desc:"Conceptos base, regiones, responsabilidad y economía cloud."},
  {id:"cmp", name:"Cómputo", sprite:"🖥️", color:"#53A8FB",
   desc:"EC2, escalado, Lambda, contenedores y serverless."},
  {id:"sto", name:"Almacenamiento y Datos", sprite:"💾", color:"#2EC5BE",
   desc:"S3, S3 avanzado, DynamoDB, RDS y sistemas de archivos."},
  {id:"net", name:"Red y Entrega", sprite:"🌐", color:"#A36BFF",
   desc:"VPC, balanceadores, DNS, CDN y API Gateway."},
  {id:"sec", name:"Seguridad", sprite:"🔐", color:"#6BC853",
   desc:"IAM, cifrado, identidades de usuario y protección perimetral."},
  {id:"evt", name:"Mensajería y Eventos", sprite:"📨", color:"#F06292",
   desc:"SQS, SNS, EventBridge y orquestación de workflows."},
  {id:"obs", name:"Observabilidad y DevOps", sprite:"📊", color:"#53A8FB",
   desc:"Métricas, trazas, CI/CD y auditoría."}
];

/* ---------- NODOS ---------- */
/* r:reino  s:sprite  t:tipo  req:prerrequisitos  xp  tier  q:preguntas  lore */
const NODES = [
/* =================== FUNDAMENTOS =================== */
{id:"fnd-cloud", r:"fnd", s:"☁️", t:"enemy", req:[], xp:60, tier:1,
 name:"La Nube", lore:"Una región se divide en Availability Zones: instalaciones aisladas con energía, red y refrigeración independientes.",
 q:[
 ["¿Qué significa que un servicio AWS sea de alta disponibilidad por diseño?", "Que tú debes configurar los grupos de zonas|Que la redundancia y el failover los gestiona el servicio|Que incluye un SLA del 99,99% garantizado por contrato|Que solo funciona en us-east-1", 1,
  "Como consumidor de un servicio gestionado, la HA es responsabilidad del proveedor: réplicas, rutas alternativas y conmutación automática."],
 ["¿Cuál es la diferencia entre una Region y una Availability Zone?", "La AZ es más grande que la región|Son sinónimos|La región agrupa varias AZs aisladas entre sí|Una AZ es un datacenter dentro de varias regiones", 2,
  "Una región es un área geográfica con al menos 3 AZs. Cada AZ es una instalación independiente con energía, refrigeración y red propias."],
 ["¿Qué significa que un recurso sea regional en AWS?", "Existe una copia en cada zona de disponibilidad|Existe una única instancia lógica que sirve desde todas las AZs de la región|Solo existe en us-east-1|Se replica automáticamente a todas las regiones", 1,
  "Un recurso regional (S3, DynamoDB, Lambda) es un único endpoint lógico repartido por todas las AZs: por eso sobrevive a un fallo de AZ."],
 ["¿Por qué es peligroso desplegar todo en una sola AZ?", "Porque es más barato pero más lento|Porque un fallo o mantenimiento de esa AZ tumba toda la aplicación|Porque AWS no lo permite|Porque las AZs no tienen energía propia", 1,
  "La AZ existe justamente para aislar fallos. Una app single-AZ tiene un punto único de fallo: por eso se diseñan despliegues multi-AZ."]]},
{id:"fnd-model", r:"fnd", s:"🤝", t:"enemy", req:["fnd-cloud"], xp:70, tier:1,
 name:"Responsabilidad Compartida", lore:"AWS se ocupa del hardware. Del código, la configuración y los datos sigues respondiendo tú.",
 q:[
 ["En el modelo de responsabilidad compartida, ¿de quién es el parcheo del sistema operativo?", "De AWS|Del cliente|Compartida al 50%|Del proveedor de internet", 1,
  "AWS protege la infraestructura: hardware, red, virtualización. Parchear el SO, el runtime y tu código es responsabilidad tuya."],
 ["¿Qué NO cubre la responsabilidad de AWS?", "La seguridad física de los datacenters|La disponibilidad de la red troncal|El parcheo de tu aplicación|La redundancia entre AZs", 2,
  "AWS cubre la capa física. Cualquier vulnerabilidad en tu app, tus datos o tus permisos IAM es tuya."],
 ["¿Quién es responsable de proteger los datos en S3 con permisos adecuados?", "AWS|Tú, el cliente|El operador del datacenter|Nadie: S3 cifra todo de forma automática y segura", 1,
  "S3 cifra el servicio por defecto, pero el diseño del cifrado (KMS), las políticas IAM y quién puede leer es responsabilidad tuya."],
 ["¿Qué es la cuenta root de AWS?", "Una cuenta de pago sin credenciales|Una cuenta con permisos ilimitados sobre todos los servicios|Un rol de solo lectura para soporte técnico|Un tipo de instancia reservada", 1,
  "La cuenta root tiene acceso total. AWS recomienda no usarla en el día a día y activar MFA y políticas de、组织ación."],
 ["¿Qué ventaja tiene la organización de AWS (Organizations)?", "Reduce la factura un 20%|Permite gestionar múltiples cuentas con políticas y límites comunes (SCP)|Convierte las cuentas root en usuarios IAM|Permite ignorar IAM", 1,
  "AWS Organizations centraliza la facturación y aplica Service Control Policies que limitan qué pueden hacer todas las cuentas."]]},
{id:"fnd-econ", r:"fnd", s:"💸", t:"enemy", req:["fnd-cloud"], xp:80, tier:1,
 name:"Economía de la Nube", lore:"Los precios cambian cada pocos meses. Saber leer una factura evita sustos de cinco cifras.",
 q:[
 ["¿Qué significa el modelo pay-as-you-go?", "Pagas una tarifa fija mensual por servicio|Pagas solo por los recursos que consumes y el tiempo que los usas|Pagas por adelantado con descuentos anuales|Pagas por ancho de banda reservado", 1,
  "No hay compromiso inicial: la factura crece con el uso real. Por eso una fuga de recursos puede costar una fortuna."],
 ["¿Qué es un Savings Plan de cómputo?", "Un tipo de instancia gratis|Un descuento por comprometerte a un nivel de cómputo durante 1 o 3 años|Una tarifa plana de red|Un cupón de prueba gratuita", 1,
  "A cambio de un compromiso de 1 a 3 años obtienes descuentos sobre On-Demand del mismo tamaño de instancia o familia."],
 ["¿Qué es una Instancia Reservada?", "Un descuento por comprometer capacidad durante 1 o 3 años en una región y familia concretas|Una instancia que nunca se apaga|Una instancia de pago por uso sin descuento|Un tipo de reserva serverless", 0,
  "Las Reserved Instances combinan descuento y capacidad reservada. Para mucha gente es la mayor palanca de ahorro."],
 ["¿Qué palanca reduce más la factura de una app serverless?", "Reducir el timeout de las funciones|Subir la memoria para que la CPU aumente|Optimizar el número de invocaciones y el tamaño de los payloads|Activar el versionado en S3", 2,
  "El coste de Lambda es GB-segundo: la palanca real es invocaciones por duración por memoria. Timeout alto y memoria inflada se multiplican."],
 ["¿Qué herramientas de AWS te ayudan a detectar gasto inefficient?", "AWS Health y Personal Health Dashboard|AWS Cost Explorer y AWS Compute Optimizer|CloudTrail|AWS Systems Manager", 1,
  "Cost Explorer desglosa el gasto por servicio; Compute Optimizer recomienda familias de instancia y tamaños más eficientes."]]},
{id:"fnd-auditor", r:"fnd", s:"🕵️", t:"elite", req:["fnd-econ"], xp:180, tier:3,
 name:"El Auditor de Costes", lore:"Una sola decisión sin revisar puede costar más que un año de formación.",
 q:[
 ["Una Lambda responde en 20 ms de media pero tiene un timeout de 900 s. ¿Cuál es el riesgo?", "Ninguno: solo se factura el tiempo real|Si la función se cuelga, AWS cobra hasta el timeout completo|El timeout debe ser múltiplo de 60|AWS no permite timeouts de 900 s", 1,
  "El coste es GB-segundo del tiempo realmente ejecutado, pero un bug de cuelgue puede consumir los 900 s completos. Reduce el timeout siempre."],
 ["Una instancia EC2 está detenida pero no terminada. ¿Sigue costando?", "No, detener la instancia no cuesta nada|Sí: sus volúmenes EBS asociados siguen facturando|Solo si tiene IP elástica|Solo en la región us-east-1", 1,
  "Detener una instancia sigue facturando sus volúmenes EBS. Las snapshots huérfanas y las elastic IPs olvidadas son el otro clásico."],
 ["¿Qué práctica de IAM reduce riesgo y coste a la vez?", "Conceder AdministratorAccess a todos los usuarios|Permisos de mínimo privilegio: solo lo que cada rol necesita|Una única clave compartida por equipo|Desactivar CloudTrail para ir más rápido", 1,
  "El menor privilegio limita tanto el daño como el gasto no autorizado. También evita que se creen recursos sin querer."],
 ["¿Cuál de estas NO es una buena práctica de coste?", "Usar Savings Plans si la carga es estable|Comprar capacidad reservada sin saber si la carga es estable|Analizar la factura con Cost Explorer|Revisar y terminar recursos sin usar", 1,
  "Reserved y Savings Plans exigen compromiso de 1 a 3 años: pierdes flexibilidad. Compensan en cargas estables, no en cargas intermitentes."],
 ["¿Qué es la arquitectura Well-Architected?", "Un patrón validado por los seis pilares de AWS|Un framework que solo aplica a EC2|Un tipo de balanceador|Un plan de disaster recovery obligatorio", 0,
  "Los seis pilares son operativo, seguridad, fiabilidad, eficiencia de rendimiento, optimización de costes y sostenibilidad."],
 ["Una app serverless lleva 30 días sin tráfico. ¿Qué pasa con sus datos?", "Se borran automáticamente|Siguen activos: el coste es cero si no hay invocaciones|Se archivan automáticamente en Glacier|Pasan a un estado idle con coste reducido", 1,
  "El serverless cobra por uso, no por almacenamiento. Ojo: esto no aplica a S3 o RDS, que sí cobran por los datos almacenados."],
 {type:"match",ref:"__any",n:1},{type:"wordsearch",ref:"__any",n:1}]},
{id:"fnd-guardian", r:"fnd", s:"🗿", t:"boss", req:["fnd-auditor"], xp:320, tier:5,
 name:"Guardián de las Regiones", lore:"Solo quien entiende la anatomía de la nube cruza su puerta.",
 q:[
 ["¿Cuántas Availability Zones tiene como mínimo una región de AWS?", "Una|Dos|Tres|Seis", 2,
  "Cada región tiene al menos 3 AZs disponibles, separadas por decenas de kilómetros y con fallos independientes."],
 ["Una app tiene ALB e instancias solo en us-east-1a. ¿Qué problema tiene?", "Ninguno si la instancia es grande|Es single-AZ: un fallo o mantenimiento de 1a deja la app sin servicio|La región solo admite dos AZs|El ALB no funciona en una sola AZ", 1,
  "Debes colocar el ALB y las instancias en subredes de AZs distintas para tener tolerancia real a fallos."],
 ["Despliegas una instancia en us-east-1 y creas una AMI. ¿Dónde puedes lanzarla?", "Solo en la AZ original|En cualquier AZ de us-east-1, y en otras regiones tras copiarla|En todas las regiones automáticamente|Solo en la región de la AMI y sin copia", 1,
  "Las AMIs son regionales pero se lanzan en cualquier AZ de su región. Para otra región hay que copiar la AMI explícitamente."],
 ["Una arquitectura multi-región activo-activa significa…", "Coste cero siempre|RTO y RPO muy bajos a cambio de complejidad y doble coste|Máxima simplicidad operativa|Evitar bases de datos replicadas", 1,
  "Multi-AZ activo-pasivo ya da HA; multi-región activo-activo baja el RTO a segundos, pero replica todo y cuesta el doble."],
 ["¿Qué es AWS Outposts?", "Servicios de AWS instalados en tu propio centro de datos para baja latencia|Un tipo de región secreta|Un acelerador solo para S3|Un servicio de backup", 0,
  "Outposts permite usar servicios gestionados de AWS dentro de tus instalaciones: útil por latencia o requisitos de residencia de datos."],
 ["Una región más cercana al usuario siempre es la más barata. ¿Verdadero?", "Sí, el precio es igual en todo el mundo|No: hay regiones más económicas porque su demanda es menor|Sí, pero solo en Gravity|Depende del servicio de salida", 1,
  "El precio varía por región según la demanda y los costes operativos. Ojo con el egreso: mover datos entre regiones tiene coste."],
 {type:"wordsearch",ref:"__any",n:1},{type:"crossword",ref:"__any",n:1}]},

/* =================== CÓMPUTO =================== */
{id:"cmp-ec2", r:"cmp", s:"🖥️", t:"enemy", req:[], xp:80, tier:1,
 name:"Instancias EC2", lore:"La pieza fundamental: una máquina virtual que administras por completo.",
 q:[
 ["¿Qué caracteriza a una instancia EC2?", "Es serverless y escala a cero|Es una VM que provisionas, parcheas y terminas tú|Solo se factura por GB almacenado|Solo acepta tráfico de Internet", 1,
  "EC2 es IaaS: tú controlas el SO, los parches, la red y el escalado. Lambda es la alternativa serverless."],
 ["¿Qué es una AMI en EC2?", "Una imagen de máquina preconfigurada para lanzar instancias|Un tipo de almacenamiento temporal|Un balanceador de carga|Una política de IAM", 0,
  "Una AMI (Amazon Machine Image) es una plantilla con SO y preinstalaciones. Puedes crear AMIs propias con Packer."],
 ["¿Qué familia de instancia eliges para cómputo intensivo con picos intermitentes?", "t3, con bursting de CPU|m7i, optimizada para cómputo|r6g, optimizada para memoria|Una instancia sin vCPU", 0,
  "Las familias con bursting (t) acumulan CPU cuando la necesitan y se idle con coste bajo. Las optimizadas (c, m, r) cobran por vCPU sostenida."],
 ["¿Qué es una Instancia Dedicada (Dedicated Host)?", "Un host físico reservado solo para tu instancia, útil por licencias|Una instancia gratuita permanente|Una instancia sin red|Un tipo de Savings Plan", 0,
  "Los Dedicated Hosts permiten ejecutar software con licencias por socket o core (SQL Server, Oracle), pero cuestan más que una instancia normal."],
 ["¿Qué es un Security Group en una instancia EC2?", "Un firewall de red a nivel de subred|Un firewall stateful que filtra tráfico por puertos en la instancia|Un tipo de volumen|Un balanceador de carga", 1,
  "Los Security Groups son stateful y se aplican a instancias, ENIs o Lambdas: permiten entrada y salida y tráfico de respuesta automático."]]},
{id:"cmp-scaling", r:"cmp", s:"📈", t:"enemy", req:["cmp-ec2"], xp:90, tier:1,
 name:"Escalado y Balanceo", lore:"Un Auto Scaling Group mantiene la salud de tu flota mientras tú duermes.",
 q:[
 ["¿Qué hace un Auto Scaling Group?", "Cambia el tipo de instancia a mano cuando falla|Mantiene un número de instancias y lanza o termina según métricas|Distribuye el tráfico entre AZs|Cifra los volúmenes de las instancias", 1,
  "ASG decide según métricas (CPU, requests) o PROGRAM y mantiene la capacidad deseada. Además reemplaza instancias unhealthy."],
 ["¿Qué afirmación sobre los Application Load Balancer es correcta?", "Solo balancean tráfico dentro de una AZ|Son regionales, multi-AZ y terminan conexión en la capa 7 (HTTP)|Solo aceptan TCP|Reemplazan a Route 53", 1,
  "Los ALB son regionales y se despliegan en varias AZs. Terminan la conexión en la capa de aplicación: por eso pueden enrutar por host, path o cookies."],
 ["Una app tiene ALB e instancias solo en 1a, con alarma de CPU. ¿Qué falta?", "Un segundo ALB|Instancias en más de una AZ para tener alta disponibilidad|Una instancia más grande|Un security group nuevo", 1,
  "ASG puede escalar por CPU, pero si todas las instancias viven en la misma AZ no hay tolerancia a un fallo de Availability Zone."],
 ["¿Qué es un target group?", "El conjunto de destinos (instancias o IPs) a los que el balanceador envía tráfico|El health check|La política de escalado|El listener del balanceador", 0,
  "El target group agrupa destinos y define health checks. Un listener asocia un puerto y protocolo con un target group."],
 ["¿Qué diferencia hay entre escalado vertical y horizontal?", "Vertical cambia de tipo de instancia; horizontal añade más instancias|Vertical añade más instancias; horizontal cambia de tamaño|Son lo mismo|Horizontal solo aplica a serverless", 0,
  "El escalado horizontal (más instancias o más funciones) es el enfoque nativo de la nube y evita el techo del tamaño de instancia."]]},
{id:"cmp-lambda-intro", r:"cmp", s:"λ", t:"enemy", req:["cmp-ec2"], xp:100, tier:1,
 name:"Lambda · Introducción", lore:"Sin servidores que gestionar. Solo código y eventos.",
 q:["Introducción:4","Límites:3"]},
{id:"cmp-lambda-conc", r:"cmp", s:"⚡", t:"enemy", req:["cmp-lambda-intro"], xp:120, tier:2,
 name:"Lambda · Concurrencia", lore:"Miles de microentornos arrancando a la vez. Aquí nacen los cuellos de botella.",
 q:["Concurrencia:4","Invocación:4",{type:"match",ref:"__any",n:1}]},
{id:"cmp-lambda-cold", r:"cmp", s:"❄️", t:"enemy", req:["cmp-lambda-conc"], xp:130, tier:2,
 name:"Lambda · Cold Starts", lore:"El enemigo más caro del serverless: el arranque en frío.",
 q:["Cold starts:3","Internals:2","Microcontenedores:2",{type:"match",ref:"__any",n:1}]},
{id:"cmp-lambda-ops", r:"cmp", s:"🧰", t:"enemy", req:["cmp-lambda-cold"], xp:150, tier:3,
 name:"Lambda · Operaciones", lore:"Desplegar sin miedo: versiones inmutables, alias y capas.",
 q:["Versioning:4","Layers:3","Handler:3","Observabilidad:3","Seguridad:3",{type:"wordsearch",ref:"__any",n:1}]},
{id:"cmp-ecs", r:"cmp", s:"📦", t:"enemy", req:["cmp-scaling"], xp:140, tier:2,
 name:"ECS y Fargate", lore:"Contenedores sin gestionar servidores ni nodos.",
 q:[
 ["¿Qué diferencia a Fargate de EC2 en el contexto de ECS?", "Fargate usa VMs dedicadas por tarea|Fargate es serverless: defines CPU y memoria por tarea y no gestionas nodos|Fargate solo funciona en Linux|EC2 no escala, Fargate sí", 1,
  "Con Fargate defines CPU y memoria por tarea y AWS ejecuta los contenedores. Sin clusters de EC2 que parchear ni mantener."],
 ["¿Qué es una task en ECS?", "Una instancia EC2 equivalente|La unidad de ejecución que contiene uno o varios contenedores|Un balanceador de carga|Un tipo de volumen EBS", 1,
  "Una task definition es la plantilla (imagen, CPU, memoria, puertos); una task es una instancia de esa plantilla ejecutándose."],
 ["¿Qué es Amazon ECR?", "Un registry privado de imágenes de contenedor|Un servicio de cómputo serverless|Un orquestador de contenedores|Un balanceador de carga", 0,
  "ECR guarda imágenes Docker y OCI, y se integra de forma nativa con ECS, EKS y Lambda."],
 ["¿Qué necesitas para ejecutar un workload serverless en Lambda?", "Una instancia EC2 siempre activa|Nada: Lambda gestiona los micro-VM con Firecracker|Un clúster de ECS|Una instancia reservada", 1,
  "Firecracker lanza micro-VM aisladas en milisegundos: ese diseño elimina la gestión de infraestructura."],
 ["¿Qué es AWS Fargate Spot?", "Instancias EC2 gratuitas siempre disponibles|Capacidad serverless interrumpible con precio muy reducido|Un tipo de GPU|Un servicio de balanceo", 1,
  "Fargate Spot ofrece descuentos grandes a cambio de que las tareas puedan interrumpirse. Ideal para batch tolerante a fallos."],
 {type:"match",ref:"__any",n:1}]},
{id:"cmp-serverless", r:"cmp", s:"🧙", t:"elite", req:["cmp-lambda-ops","cmp-ecs"], xp:280, tier:4,
 name:"Arquitecto Serverless", lore:"Domina cuándo usar Lambda, cuándo ECS y cuándo ninguno de los dos.",
 q:[
 ["¿Cuándo NO conviene Lambda frente a Fargate?", "Cuando la carga es muy esporádica|Cuando necesitas GPUs, contenedores pesados o procesos de larga duración con estado|Cuando quieres pagar por uso|Cuando el flujo es orientado a eventos", 1,
  "Lambda tiene límites (15 min de timeout), no mantiene estado y no ofrece GPUs. Para entrenamiento de modelos o procesos con estado, usa Fargate."],
 ["¿Qué patrón reduce los cold starts sin pagar Provisioned Concurrency?", "Inicializar conexiones y librerías fuera del handler, en la fase init|Aumentar el timeout de la función|Reducir la memoria reservada|Subir el límite de payload", 0,
  "El código a nivel de módulo se ejecuta una vez por entorno. Mover ahí los imports pesados y las conexiones compartidas recorta el arranque en frío."],
 ["Una Lambda escribe en DynamoDB y falla a mitad de la operación. ¿Qué usas?", "Aumentar el timeout|Reintentos automáticos con backoff y una DLQ de SQS|Más memoria|Provisioned Concurrency", 1,
  "Las invocaciones asíncronas reintentan dos veces. Para más control usa una DLQ de SQS o un event-source mapping con DLQ configurada."],
 ["¿Qué es un event-source mapping?", "La política IAM de la función|El vínculo que hace que Lambda sondee SQS, DynamoDB Streams o Kinesis y procese en lotes|Un tipo de trigger HTTP|La configuración de /tmp", 1,
  "Con un event-source mapping, Lambda sondea la fuente automáticamente y escala en lotes según el batch size configurado."],
 ["¿Cuál es el patrón canónico para procesar un pedido de forma asíncrona?", "API Gateway → Lambda síncrona → DynamoDB|API Gateway → SQS → Lambda → SNS con el resultado|S3 → Lambda → EC2|Route 53 → Lambda", 1,
  "API Gateway responde 202 de inmediato, SQS desacopla y absorbe picos, Lambda procesa y SNS notifica. El cliente nunca espera."]]},
{id:"cmp-overlord", r:"cmp", s:"👹", t:"boss", req:["cmp-serverless"], xp:420, tier:6,
 name:"El Señor del Cómputo", lore:"Decide el destino de cada carga de trabajo antes de que alguien pulse Deploy.",
 q:[
 ["Tienes tráfico constante con picos moderados. ¿Qué usas?", "EC2 sin escalado|ECS con Fargate y Auto Scaling|Lambda con Provisioned Concurrency|Un clúster Kubernetes completo", 1,
  "Carga continua con picos moderados encaja con ECS y Fargate: control de red, cualquier imagen y coste predecible."],
 ["¿Qué patrón sirve para trabajo que puede reintentarse sin efectos secundarios?", "Cola SQS y Lambda|Una llamada síncrona directa|Un cron en EC2|Una función que reintenta cien veces", 0,
  "Las colas aíslan los fallos: si un consumidor falla, el mensaje vuelve a la cola y otro lo reintenta sin duplicar efectos."],
 ["¿Qué es un deployment circuit breaker en CodeDeploy?", "Un firewall de red|Un límite de coste mensual|Un mecanismo que detiene y revierte el despliegue si las alarmas empeoran|Un tipo de instancia", 2,
  "Si las métricas de alarma empeoran durante el despliegue, CodeDeploy detiene el rollout y hace rollback automático."],
 ["¿Qué necesita una Lambda con acceso a VPC?", "Asignarle IP pública|Una subnet con salida a Internet, vía NAT Gateway o VPC endpoints|Habilitar el modo edge|Nada, se configura sola", 1,
  "Una Lambda en VPC crea ENIs en tus subnets. Sin NAT Gateway ni endpoints no tiene salida a Internet, ni a S3 ni a APIs externas."],
 ["¿Cuál es el error clásico al escalar con métrica de CPU?", "La CPU siempre refleja la carga del usuario|Una app I/O-bound puede tener CPU baja y latencia alta: conviene usar requests del ALB o target latency|La CPU no se puede usar en ASG|ASG solo reacciona a memoria", 1,
  "Si el cuello es la E/S, la CPU engaña. Mezcla varias métricas para escalar por lo que el usuario realmente percibe."],
 ["Una app serverless devuelve errores 500 esporádicos. ¿Por dónde empiezas?", "Por el precio de la función|Por CloudWatch Logs, X-Ray y si coinciden con throttles, timeouts o falta de memoria|Por el nombre del bucket|Por la región elegida", 1,
  "Los 500 en serverless suelen venir de throttling, timeouts o funciones que agotan la memoria. Los logs y las trazas lo confirman."],
 {type:"wordsearch",ref:"__any",n:1},{type:"crossword",ref:"__any",n:1}]},

/* =================== ALMACENAMIENTO =================== */
{id:"sto-s3", r:"sto", s:"📦", t:"enemy", req:[], xp:100, tier:1,
 name:"S3 · Fundamentos", lore:"Almacenamiento de objetos global, el servicio más usado de AWS.",
 q:[
 ["¿Qué es un objeto en S3?", "Una clave y un valor con metadatos dentro de un bucket|Un volumen de bloque|Una fila de una tabla|Un archivo cifrado con KMS", 0,
  "Un objeto es clave, valor y metadatos. El bucket es un espacio plano: no hay carpetas reales, solo claves que contienen una barra."],
 ["¿Cuál es el alcance del nombre de un bucket S3?", "Puede repetirse entre cuentas distintas|Debe ser único en todo el mundo entre todas las cuentas de AWS|Solo es único por región|Lo genera AWS automáticamente", 1,
  "Los nombres de bucket S3 son únicos globalmente. Por eso los buckets de web estática suelen llevar el hash de la cuenta o del sitio."],
 ["¿Cómo cobra S3 el almacenamiento?", "Tarifa fija mensual por bucket|Por GB almacenados al mes, según la clase, más los requests|Gratis hasta 5 TB|Solo cobra cuando descargas", 1,
  "S3 factura dos cosas: almacenamiento (GB-mes por clase) y requests (PUT, GET, LIST). No hay coste por bucket inactivo."],
 ["¿Qué clase de S3 usar para datos que consultas pocas veces y quieres ahorrar?", "Standard-Infrequent Access o Glacier|S3 Standard|S3 Express One Zone|S3 Object Lambda", 0,
  "Standard-IA es para accesos poco frecuentes, Glacier Deep Archive para archivo a largo plazo. Glacier es el más barato por GB."],
 ["¿Qué es S3 Transfer Acceleration?", "Subir objetos a S3 más rápido desde largas distancias|Acelerar descargas dentro de la VPC|Un tipo de instancia|Acelerar consultas en DynamoDB", 0,
  "Usa la red de edge de CloudFront para subir y descargar entre continentes. Cuesta un extra por GB, pero reduce mucho la latencia."]]},
{id:"sto-s3-adv", r:"sto", s:"🗃️", t:"enemy", req:["sto-s3"], xp:130, tier:2,
 name:"S3 · Avanzado", lore:"Versionado, replicación y políticas: donde S3 se vuelve crítico.",
 q:[
 ["¿Qué hace el versionado en S3?", "Crea una copia completa cada noche|Guarda cada versión de un objeto cada vez que se sobrescribe|Comprime los objetos|Cifra cada versión con una clave distinta", 1,
  "Con versionado activado cada subida crea una versión nueva y permite recuperar borrados accidentales. Cuesta por GB adicional."],
 ["¿Qué hace una S3 Lifecycle Policy?", "Permitir el acceso público|Mover objetos entre clases de almacenamiento o expirarlos según una regla|Hacer copias de seguridad automáticas|Replicar a otra cuenta", 1,
  "Las lifecycle rules transicionan objetos a Standard-IA o Glacier, o los borran tras X días. Es la clave para reducir coste en datos fríos."],
 ["¿Qué es Cross-Region Replication?", "Copiar objetos entre regiones para resiliencia o multi-región|Copiar dentro de la misma región|Replicar solo metadatos IAM|Un tipo de CDN", 0,
  "CRR replica objetos y, opcionalmente, tags a un bucket de otra región. Cuesta por GB y no replica el historial de versiones completo."],
 ["¿Cómo sirves estáticos desde CloudFront sin dejar el bucket público?", "Bucket con policy que permite todos|Origin Access Control u OAI, con el bucket accesible solo desde la distribución|Habilitar ACL public-read|Una Function URL de Lambda", 1,
  "Con OAC el bucket queda privado y solo CloudFront puede leerlo. Es el patrón correcto y seguro."],
 ["¿Qué protege el borrado con MFA de S3?", "Requisito de MFA para cambiar el bucket|Protección extra para eliminar un bucket o cambiar la versión actual|Solo las cuentas root|Un tipo de cifrado", 1,
  "Con Delete MFA activo, un atacante con credenciales robadas no puede borrar el bucket ni su versión actual sin un token MFA."],
 {type:"match",ref:"__any",n:1}]},
{id:"sto-dynamo", r:"sto", s:"⚛️", t:"enemy", req:["fnd-cloud"], xp:140, tier:2,
 name:"DynamoDB", lore:"Base de datos NoSQL serverless, con latencia de un solo dígito en milisegundos.",
 q:[
 ["¿Qué modelo de datos usa DynamoDB?", "Tablas con joins y esquema fijo|Colecciones clave-valor y de documento, sin esquema relacional|Un grafo de nodos y relaciones|Solo clave-valor sin índices", 1,
  "DynamoDB es clave-valor y de documento: diseñas la clave de partición y la sort key pensando en tu patrón de acceso."],
 ["¿Qué es la clave de partición?", "Un índice secundario global|El atributo que determina la distribución física de los datos y el paralelismo|La clave de cifrado del bucket|Un tipo de trigger", 1,
  "Todo lo que comparte clave de partición vive en el mismo nodo. Si todas tus consultas caen en una sola partición, no hay escalado: eso es una hot partition."],
 ["¿Qué es un GSI?", "Un índice que usa una clave de partición o sort key distinta a la de la tabla|Una tabla replicada en otra región|Una copia de seguridad automática|Un tipo de stream", 0,
  "Un Global Secondary Index permite consultar por atributos distintos, pero necesita su propia proyección y sus claves configuradas."],
 ["¿Por qué se factura DynamoDB principalmente por capacidad?", "Por cada GB almacenado a mes|Por unidades de capacidad reservadas o por request, no por almacenamiento|Por instancias de cómputo reservadas|Por ancho de banda de red", 1,
  "En modo provisioned pagas WCU y RCU reservados; en on-demand pagas por los que consumes. El almacenamiento se cobra aparte y a poco."],
 ["Una tabla recibe todo el tráfico bajo la misma clave. ¿Qué problema es?", "Ninguno|Una hot partition: un solo nodo queda saturado y no puedes escalar|Un error de cifrado|Un problema de índices secundarios", 1,
  "Solución: distribuir con sufijos (sharding), por ejemplo cliente-id加上 un número del 0 al 9 para repartir la carga."],
 {type:"match",ref:"__any",n:1}]},
{id:"sto-rds", r:"sto", s:"🗄️", t:"enemy", req:["sto-s3"], xp:140, tier:2,
 name:"RDS y Aurora", lore:"Relacional gestionado, con réplicas y failover si las necesitas.",
 q:[
 ["¿Qué gestiona RDS frente a una base de datos en EC2?", "Solo el almacenamiento en disco|El motor, los parches, los backups y las réplicas|La red VPC|Los permisos IAM", 1,
  "RDS y Aurora gestionan alta disponibilidad, backups y réplicas. Tú sigues gestionando el SQL, los índices y el modelo de datos."],
 ["¿Qué es Amazon Aurora?", "Un motor relacional serverless de AWS compatible con MySQL y PostgreSQL|Una base de datos NoSQL|Un servicio de backup|Un tipo de instancia EC2", 0,
  "Aurora ofrece hasta cinco réplicas, almacenamiento automático de hasta 128 TB y un modo serverless que escala con la carga real."],
 ["¿Qué es una deployment Multi-AZ en RDS?", "Dos bases independientes en cuentas distintas|Una instancia primaria y una standby sincronizada en otra AZ, con failover automático|Un tipo de caché en memoria|Una réplica de lectura asíncrona", 1,
  "Multi-AZ es síncrono y sirve para alta disponibilidad. Una Read Replica es asíncrona y sirve para escalar lecturas."],
 ["¿Qué problema resuelve RDS Proxy?", "El cifrado de la base de datos|El agotamiento de conexiones cuando Lambda o EC2 escalan hacia atrás|Un throughput de lectura bajo|Un backup lento", 1,
  "RDS Proxy gestiona un pool de conexiones por backend, así que miles de funciones concurrentes no abren miles de conexiones a la base."],
 {type:"match",ref:"__any",n:1}]},
{id:"sto-guardian", r:"sto", s:"🗝️", t:"elite", req:["sto-s3-adv","sto-dynamo"], xp:300, tier:4,
 name:"Custodio de los Bytes", lore:"Cada byte tiene su precio, su residencia y su fecha de caducidad.",
 q:[
 ["Un bucket tiene 5 TB y el 90% no se ha leído en un año. ¿Qué haces?", "Subirlo todo a S3 Standard|Transicionar a Glacier con lifecycle policies|Duplicarlo en otra región|Activar versionado", 1,
  "Las lifecycle rules hacia Glacier bajan mucho el coste por GB. Ten en cuenta que el restore tarda de minutos a horas."],
 ["¿Por qué el versionado puede disparar la factura de S3?", "Cada versión es una copia completa del objeto|Se paga una tarifa fija por bucket versionado|Solo cobra si borras objetos|No afecta al coste si no sobrescribes nada", 0,
  "Cada subida crea una versión completa, no incremental. Sobrescribir a menudo multiplica el almacenamiento: usa lifecycle para limpiar versiones antiguas."],
 ["¿Qué es S3 Object Lambda?", "Permite transformar los datos on-the-fly mientras se sirven, sin moverlos de S3|Es una Lambda que guarda objetos en S3|Un trigger de S3 a Lambda|Un tipo de Glacier", 0,
  "Object Lambda permite filtrar, enmascarar o transformar el objeto mientras S3 lo sirve, sin copiar los datos."],
 ["¿Cuándo NO conviene DynamoDB?", "Cuando necesitas joins y agregaciones SQL complejas|Cuando el modelo es clave-valor|Cuando quieres latencia baja|Cuando el esquema es flexible", 0,
  "Si tu acceso es relacional con joins, agregaciones y reporting complejo, Aurora o RDS es mejor elección."],
 ["¿Qué es el envelope encryption con KMS?", "Cifrar todo el disco con la clave maestra|Cifrar los datos con una data key, y esa data key con la clave maestra (CMK)|Cifrar solo el tráfico TLS|Doble cifrado en reposo", 1,
  "La data key cifra los datos y la CMK protege la data key. Al rotar la CMK solo se re-cifran las data keys, no todo el bucket."],
 {type:"match",ref:"__any",n:1},{type:"wordsearch",ref:"__any",n:1}]},
{id:"sto-colossus", r:"sto", s:"🐘", t:"boss", req:["sto-guardian","sto-rds"], xp:440, tier:6,
 name:"Coloso de los Datos", lore:"Diseña el almacenamiento antes de que caiga el primer byte.",
 q:[
 ["¿Qué patrón optimiza una tabla de pedidos con millones de filas?", "Clave de partición por cliente y sort key por fecha de pedido|Usar el nombre del producto como clave de partición|Guardar todos los pedidos en un único item JSON|Usar una clave autoincremental", 0,
  "Particionar por cliente y ordenar por fecha da localidad de datos y permite consultas del tipo pedidos de un cliente desde una fecha."],
 ["¿Qué es una caché en ElastiCache?", "Una copia de seguridad cifrada|Una caché en memoria (Redis o Valkey, y Memcached) para bajar la latencia|Un tipo de índice secundario|Una copia de S3", 1,
  "ElastiCache pone Redis en memoria: reduce la latencia a microsegundos y absorbe picos de lectura sobre DynamoDB o Aurora."],
 ["¿Qué es DynamoDB Adaptive Capacity?", "Un tipo de provisioned fijo|Ajuste automático de la capacidad al patrón real de tráfico de cada partición|Una copia de seguridad automática|Un modo de facturación especial", 1,
  "Con on-demand y Adaptive Capacity, DynamoDB se adapta al patrón real y solo pagas por lo que usas en cada partición."],
 ["¿Qué es una S3 Object Lock con retention policy?", "Una política que borra objetos tras un número fijo de días|Una política que impide borrar o modificar objetos hasta una fecha, para compliance|Replicación a otra cuenta|Cifrado con la clave del cliente", 1,
  "Object Lock con retention protege frente a borrados accidentales y ransomware. Requiere versionado y se aplica en modo WORM."],
 ["¿Qué compromiso de diseño afecta al coste de un fan-out con SQS?", "La duplicación automática de mensajes|El número de mensajes entregados: cada request al suscriptor se factura|La latencia del consumidor|El tamaño del visibility timeout", 1,
  "En un patrón SNS hacia varias colas, cada entrega es un request facturable. Diseña el fan-out antes de multiplicar suscriptores."]]},

/* =================== RED =================== */
{id:"net-vpc", r:"net", s:"🕸️", t:"enemy", req:[], xp:120, tier:1,
 name:"VPC y Subredes", lore:"Tu red privada aislada dentro de AWS. El plano donde todo se conecta.",
 q:[
 ["¿Qué es una VPC?", "Una red virtual aislada que defines dentro de una región|Un servidor DNS público|Un tipo de balanceador|Un servicio de nombres", 0,
  "Una VPC es un espacio de direcciones CIDR privado con subredes, route tables, gateways y control de acceso propio."],
 ["¿Qué diferencia hay entre una subred pública y una privada?", "La pública no tiene IP; la privada sí|La pública tiene ruta de entrada y salida por Internet Gateway; la privada no|La privada no admite instancias|Ambas son idénticas", 1,
  "Una subred pública enruta a Internet con un Internet Gateway. Una privada sale con NAT Gateway y no acepta conexiones entrantes directas."],
 ["¿Qué define una route table?", "El cifrado del tráfico de la subred|Qué destino se enruta por qué gateway o peering|La asignación de IPs públicas|El filtrado de puertos de la subred", 1,
  "La route table enruta por destino: hacia Internet Gateway, NAT Gateway, VPC peering o un VPC endpoint."],
 ["¿Qué es un Security Group?", "Un filtro stateful de entrada y salida a nivel de instancia o ENI|Un filtro stateless que se aplica a la subred|Una zona de disponibilidad|Un tipo de instancia", 0,
  "Los Security Groups son stateful: si permites la entrada, la respuesta sale automatically. Los Network ACLs son stateless y se aplican a la subred."]]},
{id:"net-elb", r:"net", s:"⚖️", t:"enemy", req:["net-vpc"], xp:120, tier:2,
 name:"Balanceadores", lore:"Distribuye el tráfico y absorbe la caída de instancias.",
 q:[
 ["¿Cuál es la diferencia clave entre NLB y ALB?", "El NLB trabaja solo con TCP; el ALB con HTTP y funciones de capa 7|El NLB es más caro siempre|El ALB no hace health checks|El NLB solo funciona en una AZ", 0,
  "NLB: capa 4, IP estática y latencia mínima. ALB: capa 7, WAF, enrutado por host o path, WebSockets y targets de Lambda."],
 ["¿Qué es un health check en un balanceador?", "Una alarma de CloudWatch|Una sonda que determina si un target está sano para recibir tráfico|Un tipo de instancia|Un balanceador anidado", 1,
  "Los health checks marcan los targets como healthy o unhealthy, y el balanceador deja de enviarles tráfico cuando fallan."],
 ["¿Qué son las sticky sessions?", "Pegar a cada usuario a un target concreto|Cifrar la sesión con TLS|Cachear respuestas en el balanceador|Un tipo de DNS", 0,
  "Sticky sessions ayudan cuando el estado vive en memoria, pero desequilibran la carga. Mejor: estado externo o sesiones firmadas."],
 ["¿Qué es cross-zone load balancing?", "Enviar tráfico a los targets de todas las AZs aunque el balanceador se integre en menos|Repetir el tráfico dentro de la misma AZ|Cargar solo las subredes privadas|Un tipo de escalado", 0,
  "Activado por defecto en ALB, reparte entre todas las AZs disponibles, incluidas las que el balanceador no tiene integrada."],
 {type:"match",ref:"__any",n:1}]},
{id:"net-route53", r:"net", s:"🌍", t:"enemy", req:["net-vpc"], xp:120, tier:2,
 name:"Route 53", lore:"El servicio DNS global de AWS, autoritativo y con health checks integrados.",
 q:[
 ["¿Qué es Route 53?", "Un servidor DNS público anyone|El servicio de DNS autoritativo de AWS que enruta nombres hacia recursos|Un CDN|Un balanceador de carga", 1,
  "Route 53 resuelve nombres públicos y privados de VPC hacia endpoints: ALB, CloudFront, una IP o cualquier otro servicio."],
 ["¿Qué routing policies ofrece Route 53?", "Solo round-robin simple|Weighted, latency, failover o geolocation|Una sola opción|Ninguna: Route 53 no enruta tráfico", 1,
  "Las políticas permiten enrutar por peso, por latencia, por salud con failover o por ubicación geográfica del usuario."],
 ["¿Qué función tienen los health checks de Route 53?", "Definir el TTL de un registro|Detectar endpoints con unhealthy y desviar el tráfico hacia alternativas|Marcar un recordset como privado|Reducir el coste de las consultas", 1,
  "Combinados con la policy de failover, los health checks permiten sacar de rotación un endpoint caído sin tocar el DNS de los clientes."],
 ["¿Qué diferencia hay entre un CNAME y un alias record?", "El CNAME no puede apuntar a otro nombre|Un CNAME apunta a otro nombre; un alias de Route 53 apunta a un recurso AWS y no cobra por la consulta|Son idénticos|El alias no se puede usar en la zona raíz", 1,
  "El alias record es un CNAME a un recurso de AWS que además es gratuito en consultas, admite health checks y funciona en la zona raíz."],
 {type:"match",ref:"__any",n:1}]},
{id:"net-cloudfront", r:"net", s:"🌩️", t:"enemy", req:["net-route53"], xp:140, tier:3,
 name:"CloudFront y @Edge", lore:"La capa de caché que pone tu contenido en el borde del mundo.",
 q:[
 ["¿Qué problema resuelve CloudFront?", "Almacenar datos a largo plazo|Cachear contenido en edge locations para reducir latencia y proteger el origen|Cifrar bases de datos|Balancear entre Availability Zones", 1,
  "CloudFront cachea en puntos de presencia cercanos al usuario: menos latencia, menos carga en el origen y protección básica contra DDoS."],
 ["¿Qué es una invalidación en CloudFront?", "Borrar la caché del origen|Marcar rutas como inválidas para forzar que el contenido se refresque desde el origen|Crear una distribución nueva|Reiniciar el servicio", 1,
  "CloudFront sirve desde caché hasta que vence el TTL. Una invalidación fuerza a pedir el objeto nuevo al origen."],
 ["¿Qué es una cache behavior?", "Una regla que define qué paths, qué origen y qué política de caché se aplica|Un tipo de instancia EC2|Un permiso IAM|Un tipo de VPC", 0,
  "Las cache behaviors separan por patrón de ruta, origen, cabeceras y TTL: por ejemplo estáticos con TTL largo y API sin caché."],
 ["¿Cuándo se usa Lambda@Edge?", "Para lógica que debe ejecutarse en el edge antes o después de CloudFront|Para correr el backend en una región concreta|Para escalar DynamoDB|Para cifrar RDS", 0,
  "Los triggers viewer duran 5 segundos y los de origin 30. Ideales para redirecciones, autenticación y pruebas A/B en el borde."],
 ["¿Qué paga CloudFront cuando no hay tráfico?", "Una tarifa fija mensual por distribución|Nada por requests: con cero tráfico no hay coste de uso|Coste por instancia de origen|Gratis siempre", 1,
  "CloudFront no tiene cuota fija: pagas por requests y por GB. Lo habitual es que el coste real sea el egreso de datos desde el origen."],
 {type:"wordsearch",ref:"__any",n:1}]},
{id:"net-apigw", r:"net", s:"🚪", t:"enemy", req:["net-elb"], xp:150, tier:3,
 name:"API Gateway", lore:"La puerta de entrada a tus APIs serverless, con stages y throttling.",
 q:[
 ["¿Qué es API Gateway?", "Un servidor web completo gestionado|La puerta de entrada para crear, publicar y asegurar APIs REST, HTTP y WebSocket|Un balanceador de carga tradicional|Un servicio de DNS", 1,
  "API Gateway gestiona el ciclo de vida de la API: recursos, métodos, authorizers, stages, throttling y uso con Lambda."],
 ["¿Qué es un Lambda Authorizer?", "Un permiso IAM para invocar la función|Una función que valida un token antes de dejar pasar la request, devolviendo una policy IAM|Un tipo de VPC endpoint|Un trigger de S3", 1,
  "El Lambda Authorizer valida el token (JWT, Cognito o propio) y devuelve una policy IAM para esa request. Su resultado se cachea."],
 ["¿Qué es el throttling en API Gateway?", "Cifrado del payload|Un límite de requests por unidad de tiempo para proteger el backend|Un tipo de DNS|Un balanceo de carga", 1,
  "El throttling protege Lambda de picos: si se excede, API Gateway responde 429 Too Many Requests."],
 ["¿Qué es un stage en API Gateway?", "Un entorno desplegado, como dev o prod, con su propia configuración y variables|Un tipo de recurso|Un log group|Una versión de la función", 0,
  "Cada stage tiene su URL, sus variables de entorno, su throttling y sus logs. Se suele usar para separar dev de prod."],
 {type:"wordsearch",ref:"__any",n:1}]},
{id:"net-firewall", r:"net", s:"🛡️", t:"elite", req:["net-vpc","net-apigw"], xp:320, tier:4,
 name:"Guardián de las Redes", lore:"Cada paquete que cruza tu frontera pasa por aquí.",
 q:[
 ["¿Cuál es la diferencia funcional entre Security Group y Network ACL?", "Son equivalentes|El SG es stateful y por instancia; la NACL es stateless y por subred|El SG es global y la NACL regional|La NACL no filtra tráfico", 1,
  "El SG filtra por instancia y es stateful. La NACL filtra la subred, es stateless y exige permitir explícitamente el tráfico de retorno."],
 ["Una Lambda en subred privada sin NAT Gateway ni VPC endpoint. ¿Qué problema tiene?", "Ninguno, las subredes privadas no necesitan salida|No tiene salida a Internet: ni S3, ni APIs externas, ni actualizaciones|No puede recibir invocaciones|RDS se vuelve público", 1,
  "Sin NAT Gateway ni endpoints no hay ruta de salida. Se resuelve con un NAT Gateway (coste por hora) o con gateway endpoints."],
 ["¿Qué es un VPC endpoint?", "Un punto de entrada público de la VPC|Conexiones privadas a servicios de AWS sin salir a Internet y sin NAT|Un tipo de subred pública|Un balanceador interno", 1,
  "Los gateway endpoints (S3, DynamoDB) son gratuitos y privados. Los interface endpoints de PrivateLink cuestan por hora y por AZ."],
 ["¿Qué riesgo tiene abrir el puerto 0.0.0.0/0 en el Security Group de un ALB?", "Ninguno si hay un WAF delante|Expone el backend a todo Internet: usa WAF, allowlist de IP u OAC para proteger el origen|Reduce el rendimiento|Cambia el protocolo a HTTPS", 1,
  "Un ALB solo debería aceptar tráfico del WAF o de una allowlist. Nunca expongas la aplicación sin una capa de protección."],
 ["¿Cómo evitas que el tráfico entre servicios salga a Internet?", "Usando endpoints o NAT Gateway en lugar de salir por Internet|Desactivando los logs de acceso|Usando una NACL que bloquee todo|No hay forma de hacerlo", 0,
  "NAT Gateway y endpoints enrutan dentro de la red de AWS, evitando el egreso a Internet con su coste y su latencia."],
 {type:"match",ref:"__any",n:1},{type:"wordsearch",ref:"__any",n:1}]},
{id:"net-maze", r:"net", s:"🌀", t:"boss", req:["net-firewall","net-cloudfront"], xp:460, tier:6,
 name:"El Laberinto de Paquetes", lore:"Diseña la ruta de cada paquete o perderás la batalla.",
 q:[
 ["Un usuario llama a una app serverless. ¿Cuál es el flujo más seguro?", "CloudFront → API Gateway → Lambda → DynamoDB|Internet → EC2 con IP pública|S3 → Lambda|Route 53 → RDS", 0,
  "CloudFront cachea y filtra, la API HTTP es barata y rápida, Lambda escala y DynamoDB persiste sin gestionar servidores."],
 ["¿Qué añade un WAF que un Security Group no puede hacer?", "Filtrar por rango de IP|Inspeccionar la capa de aplicación: payloads, patrones OWASP y rate limiting|Aumentar el ancho de banda|Cambiar el protocolo a HTTPS", 1,
  "El WAF inspecciona SQL injection, XSS y bots, y aplica rate limiting. El Security Group solo filtra por IP, puerto y protocolo."],
 ["El DNS resuelve a la IP de un ALB obsoleto. ¿Qué falla?", "Nada|Los clientes apuntan a una IP antigua y obtienen timeout o error|CloudFront deja de funcionar|Route 53 cobra un extra", 1,
  "Los registros caducan por TTL. Con alias de Route 53 y health checks puedes retirar tráfico de forma segura al descomisar."],
 ["¿Qué aportan los VPC Flow Logs?", "El ancho de banda total de la cuenta|Los metadatos de cada flujo (origen, destino, puerto) para auditar y detectar anomalías|El cifrado del tráfico|La latencia de resolución DNS", 1,
  "Flow Logs envían a CloudWatch o S3 los registros de flujo: son clave para forense, cumplimiento y detección de tráfico inesperado."],
 ["Una app necesita 3 subredes en 3 AZs. ¿Cuántas route tables y IGW necesitas?", "3 route tables, 1 IGW|Una sola route table, 1 IGW|1 route table por VPC, 3 IGW|3 route tables, 3 IGW", 0,
  "Se puede compartir la route table entre subredes equivalentes y un único Internet Gateway sirve para todas las subredes públicas de la VPC."]]},

/* =================== SEGURIDAD =================== */
{id:"sec-iam", r:"sec", s:"🔑", t:"enemy", req:[], xp:130, tier:1,
 name:"IAM · Identidades", lore:"Permisos mínimos: la base de toda la seguridad en AWS.",
 q:[
 ["¿Cuál es la diferencia entre un IAM User y un IAM Role?", "El User es solo de lectura|El User tiene credenciales persistentes; el Role se asume y genera credenciales temporales|No hay diferencia|El Role solo existe dentro de una VPC", 1,
  "Los Users tienen credenciales de larga duración, mala práctica. Los Roles generan credenciales temporales vía AssumeRole, que es lo recomendado."],
 ["¿Qué es el principio de mínimo privilegio?", "Conceder todos los permisos por simplicidad|Conceder solo los permisos estrictamente necesarios para la tarea|Rotar las claves cada hora|Usar únicamente políticas de denegación", 1,
  "El mínimo privilegio reduce el radio de impacto si una credencial se compromete. Es la práctica número uno de seguridad en AWS."],
 ["¿Qué es AssumeRole?", "Un tipo de login de la consola|El mecanismo por el que una identidad o un servicio obtiene credenciales temporales de un rol|Un tipo de cifrado|Una política de traducción", 1,
  "AssumeRole devuelve credenciales temporales con duración limitada. Los servicios lo hacen de forma automática mediante sus service roles."],
 ["¿Qué es un Execution Role de Lambda?", "Un rol solo para backups|El rol IAM que la función asume para escribir logs y llamar a otros servicios|El rol de los administradores|Un tipo de subnet", 1,
  "El Execution Role define qué puede hacer la función: escribir en CloudWatch Logs, usar KMS, acceder a la VPC o invocar otros servicios."],
 {type:"match",ref:"__any",n:1}]},
{id:"sec-kms", r:"sec", s:"🗝️", t:"enemy", req:["sec-iam"], xp:130, tier:2,
 name:"Cifrado y Secretos", lore:"KMS gobierna las claves; Secrets Manager, los secretos.",
 q:[
 ["¿Qué es AWS KMS?", "Un gestor de contraseñas|Un servicio de claves de cifrado gestionadas para S3, EBS, RDS y más|Un WAF|Un antivirus", 1,
  "KMS crea y controla claves (CMK): puedes rotarlas, auditar su uso y definir políticas de acceso sobre la propia clave."],
 ["¿Qué es AWS Secrets Manager?", "Un gestor de credenciales IAM|Un servicio para almacenar y rotar automáticamente secretos como claves de base de datos o API|Un servicio de certificados|Un antivirus", 1,
  "Secrets Manager rota credenciales automáticamente y las entrega a RDS, Lambda o ECS sin exponerlas en el código."],
 ["¿Qué es el envelope encryption con KMS?", "Cifrar todo el disco con la clave maestra|Cifrar los datos con una data key y esa data key con la CMK|Cifrar solo el tráfico TLS|Doble cifrado en reposo", 1,
  "La data key cifra los datos y la CMK protege la data key. Al rotar la CMK solo se re-cifran las data keys, no todo el bucket."],
 ["¿Qué problema resuelve Secrets Manager frente a guardar credenciales en el código?", "Ninguno|Permite rotar y auditar sin que el secreto viva en el repositorio|Cifra los datos de S3|Reduce el coste de red", 1,
  "Con Secrets Manager el secreto se resuelve en tiempo de ejecución y puede rotarse sin redesplegar ni tocar código."],
 {type:"match",ref:"__any",n:1}]},
{id:"sec-cognito", r:"sec", s:"👤", t:"enemy", req:["sec-iam"], xp:130, tier:2,
 name:"Cognito", lore:"Identidad de usuario lista para usar: registro, MFA y federación.",
 q:[
 ["¿Qué es Amazon Cognito?", "Un gestor de claves IAM|Un servicio de identidad de usuario con registro, login, MFA y federación con IdP|Un firewall perimetral|Un WAF", 1,
  "Cognito resuelve la autenticación y la federación con proveedores externos sin que tengas que construirlo tú."],
 ["¿Cuál es la diferencia entre User Pools e Identity Pools?", "No hay diferencia|User Pools autentican usuarios y emiten tokens JWT; Identity Pools dan credenciales AWS para acceder a recursos|Identity Pools cifran datos|User Pools conceden permisos IAM directamente", 1,
  "User Pool es autenticación. Identity Pool intercambia el token por credenciales AWS temporales para que el cliente acceda a S3 o DynamoDB."],
 ["¿Qué es MFA en Cognito?", "Cifrado de la base de datos|Un segundo factor de verificación, como SMS, TOTP o app|Un tipo de logging|Un rol de respaldo", 1,
  "MFA añade un segundo factor al login. Es recomendable activarlo y forzarlo con Conditional Access."],
 ["¿Qué es Conditional Access en Cognito?", "Acceso temporal a los datos|Políticas que exigen MFA, dispositivo de confianza o IP concreta según el contexto|Cifrado del tráfico|Un tipo de VPC", 1,
  "Conditional Access permite exigir MFA solo en accesos de riesgo, como una IP desconocida o un dispositivo no confiable."],
 {type:"match",ref:"__any",n:1}]},
{id:"sec-waf", r:"sec", s:"🚧", t:"enemy", req:["net-cloudfront"], xp:130, tier:3,
 name:"WAF y Shield", lore:"Defensa de capa 7 contra ataques y mitigación de DDoS.",
 q:[
 ["¿Qué es AWS WAF?", "Un firewall de red clásico|Un Web Application Firewall que filtra requests de capa 7: SQLi, XSS y bots|Un antivirus de EC2|Un IDS de red", 1,
  "WAF se asocia a ALB, API Gateway, CloudFront y AppSync, con reglas gestionadas por AWS o reglas personalizadas de tipo rate o geo."],
 ["¿Cuál es la diferencia entre Shield Standard y Shield Advanced?", "Standard es de pago y Advanced es gratis|Standard da protección DDoS básica gratis; Advanced añade mitigación avanzada, WAF y soporte 24x7 de pago|Son lo mismo|Standard solo protege CloudFront", 1,
  "Shield Advanced añade mitigación de ataques de capa 7, integración con WAF y un equipo de soporte de incidentes disponible 24x7."],
 ["¿Qué es una regla gestionada de WAF?", "Una política escrita a mano desde cero|Reglas predefinidas por AWS que cubren las OWASP Top 10 y se actualizan solas|Un tipo de VPC|Un log group", 1,
  "Las reglas gestionadas cubren inyecciones SQL, XSS, bad inputs y cosas similares, y se mantienen actualizadas por AWS sin coste adicional."],
 ["¿Dónde NO se puede adjuntar un WAF?", "CloudFront|Application Load Balancer|Una EC2 con IP pública|AppSync", 2,
  "WAF protege lo que está detrás de ALB, API Gateway, CloudFront o AppSync. Una EC2 expuesta directamente no tiene dónde adjuntarlo."],
 {type:"wordsearch",ref:"__any",n:1}]},
{id:"sec-sentinel", r:"sec", s:"👁️", t:"elite", req:["sec-iam","sec-kms"], xp:340, tier:4,
 name:"El Centinela IAM", lore:"Cada permiso es una puerta. Tú decides cuáles se abren.",
 q:[
 ["Una policy permite todas las acciones sobre todos los recursos. ¿Por qué es peligroso?", "No es peligroso en una cuenta de pruebas|Concede control total: cualquier vulnerabilidad se convierte en acceso total a la cuenta|Aumenta el rendimiento de la app|Solo afecta a la cuenta root", 1,
  "Una policy de administrador global multiplica el radio de impacto. Limita por Action y por Resource, siempre."],
 ["¿Qué es IAM Access Analyzer?", "Un antivirus para EC2|Una herramienta que valida policies, genera permisos mínimos y detecta recursos expuestos a Internet|Un tipo de MFA|Un WAF", 1,
  "Access Analyzer valida policies y detecta buckets, roles o Lambdas accesibles desde fuera. También genera la policy mínima a partir de logs."],
 ["¿Qué es una Service Control Policy?", "Un permiso de usuario|Una política que define el máximo de permisos de las cuentas dentro de una organización|Un tipo de clave KMS|Un AssumeRole", 1,
  "Las SCP son un techo de permisos a nivel de organización: ninguna cuenta puede excederlas, ni siquiera su root."],
 ["¿Qué es GuardDuty?", "Un antivirus en las instancias|Un servicio gestionado de detección de amenazas basado en Machine Learning sobre telemetría de AWS|Un WAF|Un firewall perimetral tradicional", 1,
  "GuardDuty correlaciona señales como uso de credenciales comprometidas, escaneos_ports y comunicación de comando y control."],
 {type:"match",ref:"__any",n:1},{type:"wordsearch",ref:"__any",n:1}]},
{id:"sec-fortress", r:"sec", s:"🏰", t:"boss", req:["sec-sentinel","sec-cognito","sec-waf"], xp:480, tier:6,
 name:"La Fortaleza", lore:"Aplica todo a la vez y no dejes ni una grieta.",
 q:[
 ["¿Qué arquitectura expone menos superficie de ataque?", "EC2 con IP pública y SSH abierto|CloudFront → WAF → API Gateway con authorizer → Lambda en VPC privada → RDS privado|RDS con IP pública|Un bucket S3 público", 1,
  "Esta cadena oculta los orígenes, filtra capa 7, autentica, y mantiene cómputo y datos en red privada sin IPs públicas."],
 ["Una Lambda escribe en DynamoDB. ¿Cómo limitas el acceso solo a esa app?", "Una policy IAM con Resource en asterisco|Permisos de dynamodb sobre el ARN exacto de esa tabla, solo en el rol de esa Lambda|Una bucket policy|Nada: DynamoDB es público por defecto", 1,
  "Concede permisos por acción y recurso exacto en el rol de la función. Nunca uses permisos globales para un caso concreto."],
 ["¿Qué revela un análisis de permisos con Macie?", "Los logs de CloudWatch|Datos sensibles, como PII, claves o credenciales, almacenados en S3|Vulnerabilidades de red|El coste de la cuenta", 1,
  "Macie descubre y clasifica datos sensibles en S3 para ayudar con el cumplimiento de GDPR y prevenir filtraciones."],
 ["Una app serverless escribe en DynamoDB y los errores van a una DLQ. ¿Qué garantiza la entrega?", "Nada, todo es best effort|Al menos una entrega: el consumidor debe ser idempotente con claves de deduplicación|Exactamente una entrega automática|Entrega ordenada automática", 1,
  "Las colas ofrecen entrega al menos una vez. Para Exactly Once necesitas idempotencia: claves de deduplicación y escrituras condicionales."],
 ["¿Cuál es el anti-patrón serverless más común que se debe evitar?", "Usar Lambda para todo|Poner un ALB delante de Lambda para una API simple que no lo necesita|Encolar en SQS para absorber picos|Cachear con ElastiCache", 1,
  "Un ALB delante de Lambda añade coste y complejidad sin beneficio, porque Lambda ya escala y falla bien. Una HTTP API basta."]]},

/* =================== MENSAJERÍA Y EVENTOS =================== */
{id:"evt-sqs", r:"evt", s:"📮", t:"enemy", req:[], xp:130, tier:1,
 name:"SQS · Colas", lore:"Desacopla, absorbe picos y no pierde mensajes. La columna vertebral del serverless.",
 q:[
 ["¿Qué problema resuelve SQS?", "Almacenar datos estructurados|Desacoplar productores y consumidores y absorber picos de carga|Balancear el tráfico entre regiones|Cifrar los datos en reposo", 1,
  "SQS desacopla: el productor encola y el consumidor procesa a su ritmo, así los picos no propagan presión hacia atrás."],
 ["¿Qué es el visibility timeout?", "El tiempo que un mensaje espera dentro de la cola|Cuánto permanece oculto un mensaje tras ser leído; si no se borra, vuelve a aparecer|El tiempo de vida máximo del mensaje|El intervalo de vaciado", 1,
  "Si el consumidor falla y no borra el mensaje, reaparece tras el visibility timeout. Por eso SQS es at-least-once."],
 ["¿Cuál es la diferencia entre SQS Standard y FIFO?", "Standard garantiza orden y FIFO no|Standard escala más y puede duplicar; FIFO garantiza orden y deduplicación a cambio de menos throughput|FIFO no tiene límite de throughput|Standard es siempre más rápido", 1,
  "Standard es más barato y escala casi sin límite. FIFO ofrece deduplicación por ID y orden estricto por MessageGroupId."],
 ["¿Para qué sirve una Dead Letter Queue?", "Una cola de entrada prioritaria|Una cola donde van los mensajes que fallaron tras varios intentos, para analizarlos o reprocesarlos|Un tipo de bucket|Un log group", 1,
  "La DLQ evita perder mensajes: los fallidos se apartan para inspección y puedes reprocesarlos cuando arregles la causa."]]},
{id:"evt-sns", r:"evt", s:"📢", t:"enemy", req:["evt-sqs"], xp:130, tier:2,
 name:"SNS · Pub/Sub", lore:"Un publicador, muchos suscriptores. El fan-out sin esfuerzo.",
 q:[
 ["¿Qué es Amazon SNS?", "Una cola de mensajes|Un servicio de publicación y suscripción que entrega a muchos suscriptores|Un bucket de eventos|Un balanceador de carga", 1,
  "SNS hace fan-out: un publicador y N suscriptores, que pueden ser colas SQS, funciones Lambda, endpoints HTTP, email o SMS."],
 ["¿A qué destinations entrega SNS?", "Solo a funciones Lambda|A SQS, Lambda, EventBridge, endpoints HTTP y HTTPS, email y SMS|Solo a email|Solo a SQS", 1,
  "El patrón típico es SNS hacia varias colas SQS y de ahí a consumidores independientes, para no bloquear a los suscriptores lentos."],
 ["¿Qué es una subscription filter policy?", "Filtrar los mensajes por atributos antes de entregarlos|Cifrar el mensaje en tránsito|Ordenar los mensajes|Duplicar mensajes a otros suscriptores", 0,
  "El filtrado por atributo reduce el ruido: cada suscriptor recibe solo los eventos que le interesan."],
 ["SNS y SQS, ¿cuál va primero en un patrón de fan-out?", "SNS|SQS|Da igual|Depende del volumen", 0,
  "SNS hace de publicador y SQS de amortiguador. Cada suscriptor tiene su cola, así que puede consumir a su propio ritmo."],
 {type:"match",ref:"__any",n:1}]},
{id:"evt-eventbridge", r:"evt", s:"🌉", t:"enemy", req:["evt-sns"], xp:140, tier:3,
 name:"EventBridge", lore:"El bus de eventos: conecta servicios sin saber quién escucha.",
 q:[
 ["¿Qué es Amazon EventBridge?", "Una cola de trabajo|Un bus de eventos que enruta eventos entre servicios, SaaS y fuentes propias|Una base de datos de series temporales|Un CDN", 1,
  "EventBridge enruta eventos por patrón hacia múltiples destinos, con reintentos y DLQ integrados."],
 ["¿Qué ventaja tiene EventBridge frente a SNS para integrar servicios?", "Es siempre más barato|Filtrado por contenido: cada consumidor se suscribe al patrón que le interesa|No necesita permisos IAM|Solo funciona dentro de una VPC", 1,
  "Con el enrutado por patrón, productor y consumidor quedan desacoplados: no necesitan conocerse entre sí."],
 ["¿Qué es un event bus?", "Una cola FIFO|Un canal que recibe eventos y los enruta a reglas; cada cuenta tiene uno por defecto|Un log group|Un endpoint HTTP", 1,
  "Además del bus por defecto puedes crear buses personalizados para separar dominios y aplicar políticas distintas a cada uno."],
 ["¿Qué es un schema registry de EventBridge?", "Una base de datos de esquemas|Un catálogo que define la estructura de los eventos para validarlos y versionar el contrato|Un bucket de eventos|Un firewall", 1,
  "El registro de esquemas define qué atributos tiene un evento: valida la entrada y mantiene el contrato entre productores y consumidores."],
 {type:"wordsearch",ref:"__any",n:1}]},
{id:"evt-stf", r:"evt", s:"🐢", t:"enemy", req:["evt-eventbridge"], xp:150, tier:3,
 name:"Step Functions", lore:"Orquesta flujos complejos con estado, reintentos y compensaciones.",
 q:[
 ["¿Qué es AWS Step Functions?", "Un orquestador de workflows serverless con estado y reintentos automáticos|Un motor de búsqueda de eventos|Un tipo de instancia EC2|Un balanceador de carga", 0,
  "Step Functions coordina pasos (Lambda, ECS, llamadas HTTP), guarda el estado y aplica reintentos, timeouts y compensaciones."],
 ["¿Cuál es la diferencia entre Workflows y Express?", "Express es más caro|Workflows es para flujos largos con semántica Exactly Once; Express es event-driven, de alto volumen y más barato|Express no guarda estado|Workflows no admite Lambda", 1,
  "Standard Workflows da Exactly Once y es ideal para orquestaciones largas. Express reduce coste y latencia a cambio de At Least Once."],
 ["¿Qué es un manejador Catch en Step Functions?", "Una excepción en el código|Un manejador que enruta a un estado de error o de compensación cuando una tarea falla|Un tipo de log|Un timeout de paso", 1,
  "Catch y Retry definen qué hacer ante un fallo: reintentar con backoff, compensar los pasos previos o notificar a un humano."],
 ["¿Qué patrón resuelve Step Functions para operaciones distribuidas?", "Escribir en varias bases a la vez|SAGA con compensación: si un paso falla, se revierten los pasos anteriores|Cifrar los secretos usados|Escalar las tareas", 1,
  "En SAGA, si el paso 3 de 4 falla, ejecutas las compensaciones de los pasos previos para dejar el sistema en un estado consistente."],
 {type:"wordsearch",ref:"__any",n:1}]},
{id:"evt-queue", r:"evt", s:"👹", t:"elite", req:["evt-sqs","evt-eventbridge"], xp:360, tier:4,
 name:"El Diablo del Backlog", lore:"Si el consumidor es más lento que el productor, el backlog te devorará.",
 q:[
 ["Un productor envía 10k mensajes por segundo y el consumidor procesa 5k. ¿Qué pasa?", "La cola crece sin límite con memoria constante|El backlog crece: la latencia sube y hay que escalar consumidores o usar lotes|SQS descarta los mensajes antiguos|Lambda se apaga automáticamente", 1,
  "SQS casi no tiene límite de tamaño, pero la latencia crece sin control. Sube el batch size o escala los consumidores."],
 ["¿Cómo aumentas el paralelismo en una cola SQS Standard?", "Aumentando únicamente el tamaño de lote|Añadiendo más consumidores concurrentes, hasta mil por cola|Bajando el visibility timeout|Cambiando la cola a FIFO", 1,
  "Standard escala añadiendo consumidores concurrentes. FIFO paraleliza por MessageGroupId y mantiene orden dentro de cada grupo."],
 ["Un consumidor tarda más que el visibility timeout. ¿Qué ocurre?", "El mensaje se duplica siempre|El mismo mensaje puede procesarse en paralelo por otro consumidor|SQS lo descarta|El mensaje va directo a la DLQ", 1,
  "Si no borras ni renuevas la visibilidad antes del timeout, otro consumidor puede leerlo. Reduce el lote o aumenta ese timeout."],
 ["¿Qué es un fallo parcial de lote en el trigger de SQS?", "Una caída del servicio|Reportar solo los mensajes fallidos para que vuelvan a la cola y borrar únicamente los exitosos|Un tipo de DLQ|Un límite de throughput", 1,
  "Con ReportBatchItemFailures, los mensajes fallidos vuelven a SQS y solo se borran los que se procesaron bien. Evita reintentos masivos."],
 {type:"match",ref:"__any",n:1},{type:"wordsearch",ref:"__any",n:1}]},
{id:"evt-storm", r:"evt", s:"🌪️", t:"boss", req:["evt-queue","evt-stf"], xp:500, tier:6,
 name:"La Tormenta de Eventos", lore:"Orquesta un sistema de eventos completo, tolerante a fallos.",
 q:[
 ["Flujo de un dispositivo IoT: publica, se ingiere, se procesa y se notifica. ¿Qué combo es canónico?", "IoT → Lambda síncrona → S3|API Gateway → SQS → Lambda → DynamoDB y SNS para notificar|IoT → RDS → EC2|IoT → CloudFront → S3", 1,
  "Ingesta con API Gateway, desacopla con SQS, procesa con Lambda, persiste en DynamoDB y notifica con SNS. Robusto y escalable."],
 ["Una regla de EventBridge se dispara en bucle. ¿Cómo lo evitas?", "Deshabilitando EventBridge|Filtrando por patrón y marcando los eventos ya procesados para no volver a enrutarlos|Subiendo el timeout|Usando una cola FIFO", 1,
  "Diseña con patrones de evento y guarda un marcador, por ejemplo en DynamoDB, para cortar los ciclos de realimentación."],
 ["¿Qué es el backpressure en un pipeline de eventos?", "Un tipo de ataque DDoS|Que el consumidor frene al productor para que el backlog no crezca sin límite|Un error de red|Un límite de Lambda", 1,
  "En lugar de acumular sin límite, aplica throttling o deriva a DLQ. Es la diferencia entre un sistema estable y uno que colapsa."],
 ["Una app consume de SQS Standard y occasionalmente duplica mensajes. ¿Cómo lo haces idempotente?", "Confiando en que SQS deduplique|Con una clave de idempotencia y una escritura condicional en DynamoDB o S3|Aumentando el batch size|Usando FIFO en todas partes", 1,
  "SQS Standard puede duplicar. La idempotencia la resuelves tú: clave única por operación y escritura condicional para no repetir efectos."],
 ["Una función Lambda asíncrona lanza una excepción. ¿Cuántos reintentos hace el servicio por defecto?", "Ninguno|Dos reintentos con backoff exponencial: tres intentos en total|Cinco reintentos|Reintenta hasta que tenga éxito", 1,
  "El servicio hace dos reintentos automáticos con backoff. Si vuelve a fallar, el evento va a tus Destinations onFailure, por ejemplo una DLQ."]]},

/* =================== OBSERVABILIDAD =================== */
{id:"obs-cloudwatch", r:"obs", s:"📈", t:"enemy", req:[], xp:130, tier:1,
 name:"CloudWatch", lore:"Métricas, logs y alarmas: los ojos y las alarmas de tu sistema.",
 q:[
 ["¿Qué es Amazon CloudWatch?", "Un servicio de métricas, logs, alarmas y eventos de tus recursos y aplicaciones|Un servicio de backup|Un balanceador de carga|Una base de datos de métricas", 0,
  "CloudWatch centraliza métricas, logs, alarmas y eventos. Las métricas básicas de la mayoría de servicios vienen gratuitas."],
 ["¿Qué es una métrica personalizada?", "Una métrica del sistema operativo de EC2|Una métrica que publicas tú desde tu aplicación con PutMetricData|Un tipo de alarma|Un log de auditoría", 1,
  "Las métricas de negocio, como pedidos por minuto o latencia de checkout, las emites tú. CloudWatch cobra por las custom metrics."],
 ["¿Qué es una alarma de CloudWatch?", "Un tipo de métrica|Una regla que ejecuta una acción, como notificar por SNS o escalar, cuando una métrica cruza un umbral|Un panel de control|Un tipo de log", 1,
  "Las alarmas reaccionan a umbrales y disparan acciones: escalar, notificar, reiniciar o ejecutar una remediación con Systems Manager."],
 ["¿Qué es una alarma compuesta?", "Una alarma con dos métricas combinadas con AND u OR que dispara una acción|Un tipo de métrica personalizada|Una alarma solo de facturación|Un servicio de logs", 0,
  "Combina varias alarmas con AND u OR para reducir el ruido: solo se notifica cuando la combinación indica un problema real."]]},
{id:"obs-tracing", r:"obs", s:"🔬", t:"enemy", req:["obs-cloudwatch"], xp:140, tier:2,
 name:"Trazas y X-Ray", lore:"Sigue una request a través de cada servicio para encontrar al culpable.",
 q:[
 ["¿Qué problema resuelve el tracing distribuido?", "Almacenar logs de forma centralizada|Seguir una request a través de varios servicios y medir la latencia y los errores de cada tramo|Cifrar el tráfico|Reducir el coste de red", 1,
  "El tracing correlaciona logs y métricas de toda la cadena y señala en qué tramo está la latencia o el error."],
 ["¿Qué es X-Ray?", "Un servicio de trazas distribuidas gestionado por AWS|Un antivirus|Un balanceador global de carga|Un tipo de log group", 0,
  "X-Ray instrumenta tus servicios y agrega trazas con un submapa de cada request, latencias por tramo y errores."],
 ["¿Qué es CloudWatch Logs Insights?", "Un gestor de claves de cifrado|Un servicio para consultar logs con lenguaje de consulta|Un WAF|Un tipo de métrica", 1,
  "Logs Insights permite interrogar miles de millones de líneas con consultas tipo SQL y encontrar el error en segundos."],
 ["¿Qué es AWS Application Signals?", "Un servicio de APM gestionado que correlaciona métricas, trazas y logs|Un firewall perimetral|Un gestor de secretos|Un servicio de backup", 0,
  "Application Signals instrumenta automáticamente tus aplicaciones con métricas RED, trazas y logs correlacionados."],
 {type:"match",ref:"__any",n:1}]},
{id:"obs-cicd", r:"obs", s:"🔁", t:"enemy", req:["obs-cloudwatch"], xp:140, tier:2,
 name:"CI/CD en AWS", lore:"Del commit a producción, automatizado, con rollback y canary.",
 q:[
 ["¿Qué es AWS CodePipeline?", "Un orquestador de CI/CD que coordina build, test y deploy de forma visual|Un gestor de logs|Un servicio de cómputo|Un balanceador de carga", 0,
  "CodePipeline encadena etapas, de source a build y deploy, y automatiza el flujo completo con reversión ante fallos."],
 ["¿Qué es AWS CodeBuild?", "Un entorno de desarrollo local|Un servicio gestionado de compilación y tests que empaqueta el código en contenedores|Un registry de imágenes|Un tipo de pipeline", 1,
  "CodeBuild compila, prueba y empaqueta sin servidores que gestionar, y se integra con CodePipeline y CodeDeploy."],
 ["¿Qué estrategia recomienda CodeDeploy para minimizar el riesgo?", "All at once|Canary o linear: despliega a un porcentaje del tráfico y vigila las alarmas antes de continuar|Reemplazo total sin monitoreo|Blue-green sin métricas", 1,
  "Canary y linear con alarmas de CloudWatch: si el rendimiento empeora, CodeDeploy detiene el despliegue y revierte solo."],
 ["¿Qué es un artefacto en CodePipeline?", "Un log del pipeline|El binario o la imagen que se produce en build y se consume en deploy|Un tipo de instancia|Una métrica de pipeline", 1,
  "El artefacto viaja entre etapas: build lo produce y deploy lo distribuye. Lo mejor es desplegar imágenes de contenedor, no archivos ZIP."],
 {type:"match",ref:"__any",n:1}]},
{id:"obs-config", r:"obs", s:"🗂️", t:"enemy", req:["obs-cloudwatch"], xp:140, tier:3,
 name:"Auditoría y Cumplimiento", lore:"CloudTrail registra quién hizo qué. Config vigila cómo está todo.",
 q:[
 ["¿Qué es AWS CloudTrail?", "Un servicio que registra las llamadas a la API, con quién, qué y cuándo|Un antivirus|Un gestor de costes|Un tipo de WAF", 0,
  "CloudTrail es el log de auditoría de tu cuenta: cada llamada a la API queda registrada con su resultado."],
 ["¿CloudTrail registra eventos en todas las regiones por defecto?", "Sí, automáticamente|Solo en las regiones donde lo habilitas, o en todas con un trail global|Solo en us-east-1|Solo para eventos de EC2", 1,
  "CloudTrail es opcional por región. Lo habitual es un trail global en la cuenta de gestión que entrega a un bucket cifrado."],
 ["¿Qué es AWS Config?", "Un gestor de secretos|Un servicio que registra la configuración de los recursos y evalúa reglas de cumplimiento|Un WAF|Un antivirus", 1,
  "Config guarda el historial de configuración y evalúa reglas, por ejemplo que todos los volúmenes estén cifrados, y avisa de desviaciones."],
 ["¿Para qué sirve proteger el log de CloudTrail con Object Lock?", "Para analizar datos de negocio|Para garantizar que nadie pueda alterarlo ni borrarlo, como evidencia de cumplimiento|Para reducir el coste de S3|Para cifrar el tráfico", 1,
  "Con Object Lock en modo WORM, el registro de auditoría es a prueba de manipulación. Clave para auditorías y normativa como SOC 2 o PCI."],
 {type:"wordsearch",ref:"__any",n:1}]},
{id:"obs-oracle", r:"obs", s:"🔮", t:"elite", req:["obs-tracing","obs-config"], xp:380, tier:4,
 name:"El Oráculo", lore:"Ves el presente y el pasado de tu infraestructura.",
 q:[
 ["Una Lambda falla solo en producción. ¿Por dónde empiezas?", "Con un debugger local|Con CloudWatch Logs y X-Ray, viendo la traza del request que falló|Con un escáner de malware|Con un WAF nuevo", 1,
  "Logs Insights filtra el error y X-Ray muestra qué tramo falló: la propia Lambda, una llamada a DynamoDB o un timeout."],
 ["¿Qué es un despliegue canary?", "Cambiar el código en caliente sin desplegar|Desplegar a un porcentaje del tráfico y comparar métricas antes de extenderlo|Un tipo de firewall|Una versión de la AMI", 1,
  "CodeDeploy ofrece canary y linear con alarmas de CloudWatch: observas el comportamiento real del código nuevo con tráfico parcial."],
 ["¿Qué significan RTO y RPO?", "Capacidad y coste|RTO es el tiempo máximo de recuperación; RPO la pérdida máxima de datos aceptable|Tipos de almacenamiento|Tipos de red", 1,
  "Ambos fijan el diseño de disaster recovery: RTO decide el mecanismo de failover y RPO cuánto dato puedes permitirte perder."],
 ["Una app es stateless y escala horizontalmente. ¿Qué te permite eso?", "Nada especial|Añadir o quitar instancias detrás del balanceador sin perder estado ni provocar parada|Bajar el coste de red|Reducir el almacenamiento de logs", 1,
  "Stateless permite escalar y reemplazar instancias libremente: el estado vive en DynamoDB, S3 o ElastiCache, no en la memoria del proceso."],
 {type:"match",ref:"__any",n:1},{type:"wordsearch",ref:"__any",n:1}]},
{id:"obs-overlord", r:"obs", s:"🏆", t:"boss", req:["obs-oracle","obs-cicd"], xp:520, tier:7,
 name:"Gran Arquitecto", lore:"Solo el dominio completo de la nube te corona.",
 q:[
 ["¿Cuál es el pipeline serverless de extremo a extremo más completo?", "EC2 → S3 → Route 53|API Gateway → Cognito → Lambda → SQS → DynamoDB y SNS, con CloudWatch y X-Ray|RDS → EC2 → ELB|S3 → Glue → Athena", 1,
  "Cubre autenticación, cómputo, asincronía, datos, notificaciones y observabilidad: un patrón de referencia de principio a fin."],
 ["Una API Gateway con límite bajo devuelve 429 a todos los clientes. ¿Qué ajustas?", "El timeout de las funciones|El throttling, y idealmente claves por consumidor para separar cuotas|Cambiar a REST API|Reducir la memoria de las Lambdas", 1,
  "Por defecto el límite se aplica a toda la cuenta. Con una API key por cliente o autenticación IAM separas cuotas de forma justa."],
 ["¿Cómo garantizas alta disponibilidad total en dos regiones?", "Activar multi-AZ dentro de una región|Desplegar en dos regiones con failover de Route 53 y datos replicados|Usar solo funciones Lambda|Activar Provisioned Concurrency", 1,
  "Multi-AZ activo-pasivo cubre fallos de infraestructura. Para un fallo de región necesitas dos regiones con Global Tables o Aurora Global."],
 ["¿Qué es la excelencia operativa en la práctica?", "Documentarlo todo|Automatizar despliegues, vigilar con alarmas, tener runbooks y revisar con Trusted Advisor|Activar más regiones|Subir el presupuesto", 1,
  "Operar con automatización, observabilidad y runbooks es lo que separa un prototipo de un servicio listo para producción."],
 ["¿Qué factor pesa más en el coste total de una arquitectura serverless?", "El lenguaje del runtime|El volumen de datos: invocaciones, tamaño de los mensajes y frecuencia|El nombre del bucket|La región de la VPC", 1,
  "El serverless cobra por uso, así que el volumen manda. Batching, filtros en EventBridge y cachés son las palancas que más mueven la factura."]]}
];


/* ======================================================================
   DESAFÍOS ALTERNOS · emparejar (matching), sopa de letras, crucigrama
   ======================================================================
   Formato de entrada en NODES[].q:
     {type:"match",     ref:"set-id"|"__any", n}  → toma n retos de MATCH_BANK
     {type:"wordsearch",ref:"set-id"|"__any", n}  → toma n retos de WORDS_BANK
     {type:"crossword", ref:"set-id"|"__any", n}  → toma n retos de CROSS_BANK
   Los retos son objetos {type, title, hint, data}. Se generan en runtime
   por expandQ() y se resuelven con el mismo motor de combate: un acierto
   quita 1 HP al enemigo, un error cuesta una vida.
   ====================================================================== */

/* ---------- helpers puros ---------- */
function padWordGrid(grid, words, opts){
  const size = opts.size || 11;
  for(let y=0;y<grid.length;y++)
    for(let x=0;x<grid[y].length;x++)
      if(grid[y][x] === "") grid[y][x] = String.fromCharCode(65+Math.floor(Math.random()*26));
  return grid;
}

function buildWordGrid(words, opts){
  /* palabras en MAYÚSCULAS, sin espacios; devuelve {grid, found:[[x,y],...] por palabra}
     o null si no hay colocación en size×size. Backtracking: coloca la palabra más
     larga primero y prueba posiciones/ direcciones al azar. */
  opts = opts || {};
  const size = opts.size || 11;
  const dirs = [[1,0],[0,1],[1,1],[1,-1],[-1,0],[0,-1],[-1,-1],[-1,1]];
  const sorted = [...words].sort((a,b)=>b.length-a.length);
  const grid = Array.from({length:size},()=>Array(size).fill(""));
  const placed = [];

  function fits(w,x,y,[dx,dy]){
    if(x+dx*(w.length-1) < 0 || y+dy*(w.length-1) < 0) return false;
    if(x+dx*(w.length-1) >= size || y+dy*(w.length-1) >= size) return false;
    for(let i=0;i<w.length;i++){
      const c = grid[y+dy*i][x+dx*i];
      if(c !== "" && c !== w[i]) return false;
    }
    return true;
  }
  function place(w){
    const cands = [];
    for(let y=0;y<size;y++) for(let x=0;x<size;x++) for(const d of dirs)
      if(fits(w,x,y,d)) cands.push([x,y,d]);
    /* barajar candidatos para que la rejilla varíe entre partidas */
    for(let i=cands.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [cands[i],cands[j]]=[cands[j],cands[i]]; }
    if(!cands.length) return false;
    const [x,y,[dx,dy]] = cands[0];
    for(let i=0;i<w.length;i++) grid[y+dy*i][x+dx*i] = w[i];
    placed.push({w, x, y, dx, dy});
    return true;
  }
  for(const w of sorted) if(!place(w)) return null;

  padWordGrid(grid, words, opts);
  return {grid, placed};
}

/* ---------- MATCH_COLORS: plantilla de colores para emparejar ----------
   Cada reto de matching hace una COPIA de este pool al empezar y va
   descartando un color por pareja acertada. Esta constante nunca se muta. */
const MATCH_COLORS = ["#FF9900", "#2EC5BE", "#A36BFF", "#6BC853", "#F06292"];

function buildCrossGrid(cross){
  /* Construye la rejilla 2D desde cross.words y verifica que cada palabra
     encaje y que las intersecciones coincidan. Lanza si la crossword es
     inconsistente (es un sanity check del banco de datos). */
  const ws = cross.words;
  let minX=0, maxX=0, minY=0, maxY=0;
  const set = new Map(); /* "x,y" -> char */
  ws.forEach((w)=>{
    for(let i=0;i<w.pat.length;i++){
      const x = w.x + (w.dir==="across"?i:0);
      const y = w.y + (w.dir==="down"?i:0);
      const key = x+","+y;
      if(set.has(key) && set.get(key)!==w.pat[i])
        throw new Error("crucigrama inconsistente: intersección en "+key);
      set.set(key, w.pat[i]);
      minX=Math.min(minX,x); maxX=Math.max(maxX,x);
      minY=Math.min(minY,y); maxY=Math.max(maxY,y);
    }
  });
  const W = maxX-minX+1, H = maxY-minY+1;
  const grid = Array.from({length:H},()=>Array(W).fill(""));
  set.forEach((ch,key)=>{ const [x,y]=key.split(",").map(Number); grid[y-minY][x-minX]=ch; });
  return {grid, ox:minX, oy:minY, W, H};
}

/* ---------- MATCH_BANK: servicio ↔ definición ---------- */
const MATCH_BANK = [
  {id:"svc-core", tags:["fnd","cmp","net","obs"], title:"Servicios AWS", hint:"Empareja cada servicio con su función.",
   pairs:[["EC2","Máquinas virtuales que administras por completo"],["S3","Almacenamiento de objetos con claves globales"],["Lambda","Código serverless que se ejecuta por eventos"],["VPC","Red virtual aislada que defines en una región"],["IAM","Identidades y permisos para acceder a AWS"]]},
  {id:"svc-data", tags:["sto","net","evt","obs"], title:"Almacenamiento y datos", hint:"Une cada pieza de datos con su lugar.",
   pairs:[["S3 Standard","Almacenamiento de objetos de acceso frecuente"],["Glacier","Archivo a muy largo plazo al menor coste"],["DynamoDB","Tabla NoSQL clave-valor sin servidor"],["Aurora","Motor relacional compatible con MySQL/PostgreSQL"],["ElastiCache","Caché en memoria (Redis/Memcached)"]]},
  {id:"svc-net", tags:["net","evt","fnd"], title:"Red y entrega", hint:"Conecta cada componente con su misión.",
   pairs:[["Route 53","DNS autoritativo con health checks"],["CloudFront","CDN que cachea en edge locations"],["API Gateway","Puerta de entrada a APIs REST y WebSocket"],["ALB","Balanceador de capa 7 con enrutado por host/path"],["NAT Gateway","Salida a Internet desde subredes privadas"]]},
  {id:"svc-serv", tags:["cmp","evt","sec","obs"], title:"Servicios serverless", hint:"Une cada servicio con su función.",
   pairs:[["Step Functions","Orquesta workflows con estado y reintentos"],["EventBridge","Bus de eventos con enrutado por patrón"],["SQS","Cola de mensajes con at-least-once"],["SNS","Publicador con fan-out a muchos suscriptores"],["AppSync","API GraphQL gestionada"]]},
  {id:"svc-sec", tags:["sec","fnd","net"], title:"Seguridad", hint:"Empareja cada herramienta con su misión.",
   pairs:[["KMS","Claves de cifrado gestionadas"],["Secrets Manager","Rotación y custodia de secretos"],["Cognito","Identidad de usuario y federación"],["WAF","Filtra requests de capa 7 (SQLi, XSS)"],["GuardDuty","Detección de amenazas con ML"]]},
  {id:"svc-devops", tags:["obs","cmp","sec"], title:"DevOps y observabilidad", hint:"Une cada pieza con su propósito.",
   pairs:[["CloudWatch","Métricas, logs y alarmas"],["X-Ray","Trazas distribuidas de extremo a extremo"],["CloudTrail","Registro de llamadas a la API"],["CodePipeline","Orquestador de CI/CD"],["CodeBuild","Compilación y tests gestionados"]]},
  {id:"svc-lambda", tags:["cmp","obs","evt"], title:"Lambda y eventos", hint:"Empareja cada pieza de Lambda.",
   pairs:[["Layer","ZIP con dependencias reutilizables"],["Execution Role","Permisos IAM de la función"],["Provisioned","Entornos calientes sin cold starts"],["Destination","Enruta el resultado asíncrono"],["Event Source Mapping","Sondea SQS o DynamoDB Streams"]]},
  {id:"svc-mix", tags:["__any"], title:"Mezcla AWS", hint:"Une cada concepto con su definición.",
   pairs:[["AMI","Imagen de máquina para lanzar instancias"],["Security Group","Firewall stateful por instancia"],["ALIAS","Puntero estable a una versión de Lambda"],["Savings Plan","Descuento por compromiso de cómputo"],["Object Lock","Inmutabilidad WORM en S3"]]}
];

/* ---------- WORDS_BANK: sopa de letras ---------- */
const WORDS_BANK = [
  {id:"words-core", tags:["fnd","cmp"], title:"Servicios AWS", hint:"Encuentra estos servicios en la sopa.",
   words:["S3","EC2","LAMBDA","VPC","IAM","SQS"]},
  {id:"words-data", tags:["sto","cmp"], title:"Almacenamiento", hint:"Localiza las piezas de datos.",
   words:["BUCKET","GLACIER","DYNAMODB","AURORA","SNAPSHOT","REDSHIFT"]},
  {id:"words-net", tags:["net","fnd"], title:"Red", hint:"Busca los componentes de red.",
   words:["ROUTE53","CLOUDFRONT","APIGATEWAY","SUBNET","GATEWAY","CDN"]},
  {id:"words-events", tags:["evt","cmp"], title:"Eventos y colas", hint:"Encuentra la mensajería.",
   words:["SQS","SNS","EVENTBRIDGE","ACTIONS","FANOUT","BACKLOG"]},
  {id:"words-sec", tags:["sec","fnd"], title:"Seguridad", hint:"Busca las herramientas de seguridad.",
   words:["IAM","KMS","WAF","COGNITO","GUARDDUTY","MFA"]},
  {id:"words-obs", tags:["obs","sec"], title:"Observabilidad", hint:"Localiza el stack de observabilidad.",
   words:["CLOUDWATCH","XRAY","CLOUDTRAIL","ALARM","LOG","TRACE"]},
  {id:"words-serverless", tags:["cmp","evt"], title:"Serverless", hint:"Encuentra el vocabulario serverless.",
   words:["LAMBDA","FIRECRACKER","PROVISIONED","COLDSTART","EVENT","RUNTIME"]},
  {id:"words-boss", tags:["__any"], title:"Reto final", hint:"Términos sueltos de toda la nube.",
   words:["REGION","AZ","VPC","ENI","ECR","TARGET"]}
];

/* ---------- CROSS_BANK: crucigramas artesanales ---------- */
const CROSS_BANK = [
  {id:"cross-network", tags:["net","fnd"], title:"Crucigrama: Red y entrega", hint:"Ancla horizontal + palabras verticales.",
   words:[
     {num:1, pat:"NETWORK", x:1, y:0, dir:"across", clue:"Red privada aislada en una región."},
     {num:1, pat:"NAT",     x:1, y:0, dir:"down",   clue:"... Gateway: salida a Internet de subredes privadas."},
     {num:2, pat:"EC2",     x:2, y:0, dir:"down",   clue:"Máquinas virtuales de AWS."},
     {num:3, pat:"TCP",     x:3, y:0, dir:"down",   clue:"Protocolo de transporte de Internet."},
     {num:4, pat:"WAF",     x:4, y:0, dir:"down",   clue:"Firewall de capa 7."},
     {num:5, pat:"OUT",     x:5, y:0, dir:"down",   clue:"Tráfico de ... (egreso de la VPC)."},
     {num:6, pat:"RDS",     x:6, y:0, dir:"down",   clue:"Base de datos relacional gestionada."},
     {num:7, pat:"KMS",     x:7, y:0, dir:"down",   clue:"Servicio de claves de cifrado."}
   ]},
  {id:"cross-database", tags:["sto","obs"], title:"Crucigrama: Datos y consultas", hint:"Ancla horizontal + palabras verticales.",
   words:[
     {num:1, pat:"DATABASE", x:1, y:0, dir:"across", clue:"Conjunto de datos gestionado por un motor."},
     {num:1, pat:"DYNAMO",   x:1, y:0, dir:"down",   clue:"... DB: NoSQL clave-valor serverless."},
     {num:2, pat:"AMI",      x:2, y:0, dir:"down",   clue:"Imagen de máquina para lanzar instancias."},
     {num:3, pat:"TMP",      x:3, y:0, dir:"down",   clue:"Directorio efímero de Lambda (/...)."},
     {num:4, pat:"ATHENA",   x:4, y:0, dir:"down",   clue:"Consultas SQL sobre objetos en S3."},
     {num:5, pat:"BLOB",     x:5, y:0, dir:"down",   clue:"Tipo de dato binario grande."},
     {num:6, pat:"AURORA",   x:6, y:0, dir:"down",   clue:"MySQL/PostgreSQL gestionado de alto rendimiento."},
     {num:7, pat:"S3",       x:7, y:0, dir:"down",   clue:"Almacenamiento de objetos."},
     {num:8, pat:"EBS",      x:8, y:0, dir:"down",   clue:"Volumen de bloque para instancias EC2."}
   ]},
  {id:"cross-serverless", tags:["cmp","evt"], title:"Crucigrama: Serverless", hint:"Ancla horizontal + palabras verticales.",
   words:[
     {num:1, pat:"SERVERLESS", x:1, y:0, dir:"across", clue:"Modelo de cómputo sin servidores."},
     {num:1, pat:"S3",         x:1, y:0, dir:"down",   clue:"Almacenamiento de objetos."},
     {num:2, pat:"EC2",        x:2, y:0, dir:"down",   clue:"La VM clásica de AWS."},
     {num:3, pat:"ROUTE53",    x:3, y:0, dir:"down",   clue:"DNS autoritativo con health checks."},
     {num:4, pat:"VPC",        x:4, y:0, dir:"down",   clue:"Red virtual privada."},
     {num:5, pat:"EBS",        x:5, y:0, dir:"down",   clue:"Volumen de bloque para EC2."},
     {num:6, pat:"ROUTE",      x:6, y:0, dir:"down",   clue:"Ruta en una Route Table."},
     {num:7, pat:"LAMBDA",     x:7, y:0, dir:"down",   clue:"Código serverless por eventos."},
     {num:8, pat:"ECS",        x:8, y:0, dir:"down",   clue:"Orquestador de contenedores."},
     {num:9, pat:"SNS",        x:9, y:0, dir:"down",   clue:"Pub/sub con fan-out."},
     {num:10,pat:"STS",        x:10,y:0, dir:"down",   clue:"Servicio de tokens de seguridad."}
   ]},
  {id:"cross-storing", tags:["fnd","cmp","net"], title:"Crucigrama: Servicios esenciales", hint:"Ancla horizontal + palabras verticales.",
   words:[
     {num:1, pat:"STORING",   x:1, y:0, dir:"across", clue:"Conservar datos de forma durable en AWS."},
     {num:1, pat:"S3",        x:1, y:0, dir:"down",   clue:"Almacenamiento de objetos."},
     {num:2, pat:"TCP",       x:2, y:0, dir:"down",   clue:"Protocolo de transporte."},
     {num:3, pat:"OUTPOSTS",  x:3, y:0, dir:"down",   clue:"AWS ...: hardware en tu datacenter."},
     {num:4, pat:"ROUTE53",   x:4, y:0, dir:"down",   clue:"DNS autoritativo."},
     {num:5, pat:"IAM",       x:5, y:0, dir:"down",   clue:"Identidades y permisos."},
     {num:6, pat:"NAT",       x:6, y:0, dir:"down",   clue:"... Gateway: salida de subredes privadas."},
     {num:7, pat:"GLUE",      x:7, y:0, dir:"down",   clue:"ETL serverless sobre data lakes."}
   ]},
  {id:"cross-observer", tags:["obs","sec"], title:"Crucigrama: El Observador", hint:"Ancla horizontal + palabras verticales.",
   words:[
     {num:1, pat:"OBSERVER", x:1, y:0, dir:"across", clue:"Quien vigila los logs, métricas y trazas."},
     {num:1, pat:"OPS",      x:1, y:0, dir:"down",   clue:"Operaciones, abreviado."},
     {num:2, pat:"BILLING",  x:2, y:0, dir:"down",   clue:"... and Cost Management: controla el gasto."},
     {num:3, pat:"SNS",      x:3, y:0, dir:"down",   clue:"Pub/sub con fan-out."},
     {num:4, pat:"EVENTBRIDGE", x:4, y:0, dir:"down", clue:"Bus de eventos con enrutado por patrón."},
     {num:5, pat:"ROUTE53",  x:5, y:0, dir:"down",   clue:"DNS autoritativo."},
     {num:6, pat:"VPC",      x:6, y:0, dir:"down",   clue:"Red virtual privada."},
     {num:7, pat:"EC2",      x:7, y:0, dir:"down",   clue:"La VM clásica de AWS."},
     {num:8, pat:"ROUTE",    x:8, y:0, dir:"down",   clue:"Ruta en una Route Table."}
   ]}
];

/* ======================================================================
   SALAS DE PUZLES Y MEZCLA DE DESAFÍOS
   ====================================================================== */
const PUZZLE_HALLS = [
  {id:"puz-hall-fnd", r:"fnd", s:"🧩", t:"elite", req:["fnd-auditor"], xp:200, tier:4,
   name:"Sala de Puzles de Fundamentos", lore:"Empareja conceptos, encuentra palabras y demuestra que dominas los cimientos de la nube.",
   q:[{type:"match",ref:"fnd",n:3},{type:"wordsearch",ref:"fnd",n:1},"Introducción:2","Serverless:1"]},
  {id:"puz-hall-cmp", r:"cmp", s:"🧠", t:"elite", req:["cmp-serverless"], xp:280, tier:5,
   name:"Sala de Puzles de Cómputo", lore:"Un laberinto de servicios y términos que sólo un arquitecto serverless supera.",
   q:[{type:"match",ref:"cmp",n:2},{type:"wordsearch",ref:"cmp",n:2},"Concurrencia:2","Cold starts:1","Layers:1"]},
  {id:"grand-puz-hall", r:"obs", s:"🏛️", t:"elite", req:["obs-oracle"], xp:380, tier:6,
   name:"La Gran Sala de Puzles", lore:"Donde los observadores se vuelven maestros: emparejar, buscar y cruzar palabras.",
   q:[{type:"wordsearch",ref:"obs",n:2},{type:"crossword",ref:"__any",n:1},{type:"match",ref:"obs",n:1},"Observabilidad:1","Seguridad:1"]}
];
NODES.push(...PUZZLE_HALLS);

/* Añade sólo los tipos que todavía no tenga un nodo. Así los nodos que ya
   declaran retos explícitamente conservan su contenido sin duplicados. */
function hasChallenge(n,type){ return (n.q||[]).some(e=>e && !Array.isArray(e) && e.type===type); }
NODES.forEach(n=>{
  if(n.t==="enemy" && n.tier>=2 && !hasChallenge(n,"match")) n.q.push({type:"match",ref:"__any",n:1});
  if(n.t==="enemy" && n.tier>=3 && !hasChallenge(n,"wordsearch")) n.q.push({type:"wordsearch",ref:"__any",n:1});
  if(n.t==="elite"){
    if(!hasChallenge(n,"match")) n.q.push({type:"match",ref:"__any",n:1});
    if(!hasChallenge(n,"wordsearch")) n.q.push({type:"wordsearch",ref:"__any",n:1});
  }
  if(n.t==="boss"){
    if(!hasChallenge(n,"wordsearch")) n.q.push({type:"wordsearch",ref:"__any",n:1});
    if(!hasChallenge(n,"crossword")) n.q.push({type:"crossword",ref:"__any",n:1});
  }
});

