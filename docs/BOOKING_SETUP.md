# Agenda por servicio y barbero · 17:17

Confirmación del dueño, 2026-10-12: asignación **automática** al barbero disponible, sin combinaciones por ahora. **No tienen horarios individuales fijos: se cubren según disponibilidad.** Operación por cobertura de fecha/franja, no por dos agendas semanales completas asumidas. La landing está preparada; la cuenta externa todavía no está configurada ni verificada. El acceso del navegador a `app.cal.com` fue rechazado por permiso denegado. No se compraron planes, enviaron invitaciones ni crearon reservas.

## Duraciones confirmadas

| Servicio | Bloque de agenda |
| --- | --- |
| Corte masculino | 40 minutos |
| Rulos permanentes | 120 minutos, consulta previa obligatoria, corte separado |
| Tinte | 120 minutos |
| Barba | Bloque de 40 minutos |
| Corte infantil | Bloque de 40 minutos |
| Perfilado de cejas | Bloque de 40 minutos |
| Lavado | 10 minutos |

El dueño indicó que los servicios cortos entran en el bloque de 40 minutos del corte. Esto define tiempo reservado, no una promesa de que cada procedimiento toma 40 minutos ni de que su precio incluya corte. No se suman procedimientos ni se publican combinaciones. `services[].durationMinutes` en `src/data.mjs` es la fuente editorial de estas duraciones.

## Cómo abrir uno o dos turnos simultáneos

Cada barbero tiene su disponibilidad **por fecha y franja** y calendario de ocupación. No se presume que ambos trabajan el horario público del local. La capacidad surge de los barberos libres para **todo** el intervalo del servicio. No existe una bandera global «dos cupos» que permita reservar a un barbero dos veces.

Ejemplo ilustrativo, no horario publicado: a las 10:00 Jonatan toma rulos hasta las 12:00. Si Esteban trabaja y está libre, puede tomar un corte de 10:00 a 10:40 y otro de 10:40 a 11:20. Si no trabaja, sólo existe el turno de Jonatan. Si quedan 40 minutos antes del cierre, se ofrece corte pero no rulos ni tinte.

Para habilitar al segundo barbero de manera ocasional, agregar una excepción de disponibilidad **en su agenda** para la fecha y franja correspondiente. Para retirar esa disponibilidad, ajustar su excepción o marcarlo no disponible. Confirmar primero cómo manejar citas ya existentes: cambiar un horario no equivale a cancelar ni reasignar reservas.

Rutina propuesta: antes de abrir fechas reservables, indicar qué barbero cubre mañana/tarde o toda la jornada. Abrir al segundo sólo donde esté confirmada su presencia. Si todavía no se conoce quién cubre una fecha, no prometer dos turnos ni asignación automática fiable allí: coordinarla manualmente por WhatsApp hasta confirmar la cobertura. El horizonte de fechas se define con el dueño, sin inventar días de anticipación. Si una reserva ya está asignada y se cambia la cobertura, revisar/reasignar esa cita en Cal.com y comprobar disponibilidad/servicio del reemplazante; no basta editar el calendario de trabajo.

## Configuración externa de Cal.com

1. Acceder a las cuentas de Jonatan y Esteban. Confirmar quién es dueño/admin: el username del enlace actual y su título no bastan para identificar una cuenta de integración.
2. Confirmar el plan. Round Robin y disponibilidad compartida corresponden a **Teams**, de pago. La página oficial mostraba USD 12 por usuario/mes con facturación anual; dos usuarios equivalen a USD 24/mes facturados anualmente, antes de impuestos. Verificar precio/modalidad en la cuenta antes de contratar. No se inició trial ni compra. Si se eligen dos cuentas individuales gratuitas, habría que cambiar la decisión de asignación automática por elección de barbero; la landing actual no simula Round Robin.
3. Crear/configurar equipo 17:17 con ambos barberos. Las invitaciones requieren correos confirmados y autorización para enviarlas; no se enviaron desde esta sesión.
4. Cada barbero conecta su calendario de citas y los calendarios que realmente deben bloquearlo. Los eventos de **todos** sus servicios deben verse entre sí para evitar corte durante rulos. Un calendario compartido con todos los turnos marcado como ocupado para ambos puede bloquear incorrectamente al barbero libre: comprobar el alcance de conflictos por persona.
5. Configurar disponibilidad individual con zona `America/Asuncion`, basada en cobertura por fecha. El horario público del local 8:00–21:00 no prueba que ambos estén presentes toda esa franja. No copiarlo como horario recurrente de los dos. No publicar días cuya cobertura todavía no esté confirmada.
6. Cargar las fechas/franjas confirmadas con excepciones por fecha sobre el horario que usan los eventos publicados, y retirarlas cuando no trabaje ese barbero. Si la interfaz exige una base semanal, verificar cómo mantener cerrados los días sin cobertura antes de activar el enlace; no asumir que existe disponibilidad. Registrar descansos también. Abrir ambos sólo en las franjas donde trabajan juntos.
7. Crear un evento de equipo **por servicio**, con la duración de la tabla. No usar una pregunta «servicio» sobre un evento fijo de 40 minutos: cambiar una respuesta no alarga su ocupación.
8. Tipo **Round Robin**, modo **Maximize availability**, sin host fijo que requiera presencia simultánea de los dos. Seleccionar sólo barberos habilitados para ese servicio; confirmar quién realiza rulos/tinte. Un evento Collective ocupa a ambos para un mismo cliente y no representa dos clientes simultáneos. Seats/cupos de grupo sobre un solo host tampoco representa dos barberos independientes.
9. Ubicación **In person / presencial**: `Cap. Dado esq. Gobernador Irala, Luque, Paraguay`. Eliminar Cal Video de esos eventos. Cal Video significa videollamada, no un estado pendiente de desarrollo.
10. Mantener el evento de rulos accesible sólo después de consulta por largo/condiciones. No publicar un acceso directo que saltee esa evaluación. La landing seguirá enviando la consulta a WhatsApp, aunque se cargue la URL de rulos; el equipo comparte el enlace correcto tras evaluar.
11. Confirmar buffers, anticipación mínima e intervalo entre horas ofrecidas con el dueño. No se inventaron valores. Diferenciar incremento de horarios visibles de duración: un evento de 120 minutos ocupa 120 aunque su siguiente inicio visible esté a 10 minutos.
12. Configurar nombre/contacto del cliente y notificaciones en Cal.com, sin conectar todavía el CRM. Una preferencia escrita por el cliente no autoriza cambiar de servicio, duración ni barbero asignado.
13. Verificar con Troubleshooter/calendarios: sólo un barbero, ambos, ausencia del segundo, ocupación de 120 minutos bloqueando los demás servicios de ese host, bloqueo al cierre y zona horaria. Confirmar la asignación efectiva y la prevención de concurrencia en una prueba controlada autorizada antes de activar. No se crearon reservas reales en esta sesión.
14. Copiar **URLs reales** y registrar la verificación en `business.booking.serviceEvents`. No inventar slugs. Retirar o renombrar el evento genérico actual para que un enlace viejo de 40 minutos no permita reservar rulos/tinte por error. El enlace actual se conserva como referencia, no se usa como fallback de servicios.

## Configuración de la landing

Todos los CTA de agenda llevan a `/reservar`, sin calendario embebido ni descargas externas. La persona elige servicio y ve su bloque de tiempo. Si el evento aún no está verificado, el enlace coordina ese servicio por WhatsApp. Productos mantienen sus consultas independientes.

`serviceEvents` contiene `null` hasta la verificación externa. Formato de una entrada **después** de configurar, comprobar y copiar la URL real:

```js
// Ejemplo de estructura, no URL publicable ni configuración ya activa.
corte: {
  url: "<URL HTTPS real del evento de corte>",
  durationMinutes: 40,
  location: "inPerson",
  assignment: "roundRobin",
  verified: true,
}
```

`serviceBookingLink()` exige duración coincidente, ubicación presencial, Round Robin verificado y dominio HTTPS `cal.com`. Un evento incompatible hace fallar el build mediante las comprobaciones de render; nunca deriva silenciosamente a la agenda genérica. La bandera `verified` registra un QA humano, no autentica reservas ni reemplaza la comprobación externa. No hay secretos, calendarios privados, UUID de tenant ni disponibilidad calculada en el navegador.

## Preparación del futuro CRM

Ver [BARBERIA_CRM_INTEGRATION.md](BARBERIA_CRM_INTEGRATION.md): mapping server-side de integración/event type a servicio y de host real a barbero. Guardar el intervalo real, anfitrión asignado, estado, UIDs e historial desde webhook firmado/API v2; no desde clics o duraciones enviadas por la landing. Capacidad dinámica por barbero y servicio, sin duplicar ahora el motor de disponibilidad de Cal.com.

## Fuentes oficiales consultadas

- [Añadir ubicación](https://cal.com/help/event-types/how-to-add-location)
- [Round Robin, hosts y Maximize availability](https://cal.com/blog/round-robin-scheduling-guide)
- [Excepciones por fecha](https://cal.com/blog/what-are-date-overrides-and-how-do-i-enable-them)
- [Planes y funciones](https://cal.com/pricing)

Revisar opciones actuales en la cuenta: este documento no afirma que la configuración externa haya sido aplicada.
