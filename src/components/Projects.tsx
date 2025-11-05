import { ProjectCard } from './ProjectCard';
import { useDynamicColors } from './DynamicStyles';

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Plataforma completa de comercio electrónico con carrito de compras, pasarela de pago y panel de administración.",
    image: "https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBzaG9wcGluZyUyMG9ubGluZXxlbnwxfHx8fDE3NjIyNDQ0MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Analytics Dashboard",
    description: "Dashboard interactivo con visualización de datos en tiempo real, gráficos avanzados y reportes personalizados.",
    image: "https://images.unsplash.com/photo-1748609160056-7b95f30041f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBhbmFseXRpY3N8ZW58MXx8fHwxNzYyMjExMDUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["TypeScript", "Next.js", "Chart.js", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Mobile App",
    description: "Aplicación móvil multiplataforma con sincronización en la nube y funcionalidades offline-first.",
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMG1vYmlsZSUyMGFwcHxlbnwxfHx8fDE3NjIzMDk0ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["React Native", "Firebase", "Redux", "iOS/Android"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Task Management System",
    description: "Sistema de gestión de tareas colaborativo con asignación de proyectos, seguimiento de tiempo y notificaciones.",
    image: "https://images.unsplash.com/photo-1566915896913-549d796d2166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjB3b3Jrc3BhY2UlMjBkZXZlbG9wZXJ8ZW58MXx8fHwxNzYyMjk0MTIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Vue.js", "Express", "Socket.io", "MySQL"],
    liveUrl: "#",
    githubUrl: "#"
  }
];

export function Projects() {
  const colors = useDynamicColors();
  
  return (
    <section id="projects" className="py-20 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`mb-6 bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent text-5xl pb-4 border-b-4 border-${colors.border}/30 inline-block`}>
            Proyectos Destacados
          </h2>
          <p className={`${colors.textTertiary} max-w-2xl mx-auto mt-6`}>
            Una selección de mis trabajos más recientes, desde aplicaciones web hasta soluciones móviles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
