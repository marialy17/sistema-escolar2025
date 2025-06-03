'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../page.module.css";



interface Superpower {
  name: string;
  description: string;
  emoji: string;
  rarity: "común" | "raro" | "épico" | "legendario";
  color: string;
}

// Componente que muestra dos imágenes para modo claro y oscuro


export default function Home() {
  const [currentPower, setCurrentPower] = useState<Superpower | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [powerCount, setPowerCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const superpowers: Superpower[] = [
    {
      name: "Teletransportación de Tacos",
      description: "Puedes hacer aparecer tacos deliciosos en cualquier momento y lugar",
      emoji: "🌮",
      rarity: "común",
      color: "#fbbf24",
    },
    {
      name: "Hablar con WiFis",
      description: "Entiendes el lenguaje secreto de las redes inalámbricas",
      emoji: "📶",
      rarity: "raro",
      color: "#60a5fa",
    },
    {
      name: "Invisibilidad Selectiva",
      description: "Solo eres invisible cuando nadie te está mirando",
      emoji: "👻",
      rarity: "épico",
      color: "#a78bfa",
    },
    {
      name: "Super Velocidad para Procrastinar",
      description: "Puedes posponer tareas a velocidades supersónicas",
      emoji: "⚡",
      rarity: "común",
      color: "#34d399",
    },
    {
      name: "Controlar el Clima de Zoom",
      description: "Puedes hacer que llueva o haga sol en las videollamadas",
      emoji: "🌦️",
      rarity: "raro",
      color: "#fb7185",
    },
    {
      name: "Leer Mentes de Mascotas",
      description: "Finalmente sabes qué piensan los perros y gatos",
      emoji: "🐕",
      rarity: "épico",
      color: "#f59e0b",
    },
    {
      name: "Generar Memes Perfectos",
      description: "Cada meme que creas se vuelve viral instantáneamente",
      emoji: "😂",
      rarity: "legendario",
      color: "#ef4444",
    },
    {
      name: "Encontrar Cosas Perdidas",
      description: "Siempre sabes dónde están las llaves, el control remoto y los calcetines",
      emoji: "🔍",
      rarity: "épico",
      color: "#8b5cf6",
    },
  ];

  // Genera un superpoder aleatorio con animación y efecto de celebración
  const generateRandomPower = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * superpowers.length);
      const randomPower = superpowers[randomIndex];
      if (randomPower) {
        setCurrentPower(randomPower);
        setPowerCount((prev) => prev + 1);
        setIsGenerating(false);

        if (randomPower.rarity === "legendario") {
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 3000);
        }
      }
    }, 1500);
  };

  // Solo genera un poder al montar el componente
  useEffect(() => {
    generateRandomPower();
  }, []);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "común":
        return "#10b981";
      case "raro":
        return "#3b82f6";
      case "épico":
        return "#8b5cf6";
      case "legendario":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className={styles.page}>
      {/* Celebración con emojis animados */}
      {showCelebration && (
        <div className={styles.celebrationOverlay} aria-live="polite" role="alert" aria-atomic="true">
          <div className={styles.bounceEmoji} aria-hidden="true">🎉</div>
          <div className={styles.pulseEmoji} aria-hidden="true">✨</div>
          <div className={styles.bounceEmojiLarge} aria-hidden="true">🎊</div>
        </div>
      )}

      <main className={styles.main}>
        

        <section className={styles.headerInfo} aria-label="Información del generador de superpoderes">
          <h1>🦸‍♂️ Generador de Superpoderes 🦸‍♀️</h1>
          <p>
            Superpoderes generados: <strong>{powerCount}</strong>
          </p>
        </section>

        {currentPower && !isGenerating ? (
          <article
            className={styles.powerCard}
            style={{
              background: `linear-gradient(135deg, ${currentPower.color}22 0%, ${currentPower.color}44 100%)`,
              borderColor: getRarityColor(currentPower.rarity),
            }}
            aria-live="polite"
          >
            <span
              className={styles.rarityBadge}
              style={{ backgroundColor: getRarityColor(currentPower.rarity) }}
              aria-label={`Rareza: ${currentPower.rarity}`}
            >
              {currentPower.rarity.toUpperCase()}
            </span>

            <div className={styles.powerEmoji} aria-hidden="true">
              {currentPower.emoji}
            </div>

            <h2 style={{ color: getRarityColor(currentPower.rarity) }}>{currentPower.name}</h2>

            <p>{currentPower.description}</p>
          </article>
        ) : (
          <div className={styles.loadingContainer} role="status" aria-live="polite" aria-busy="true">
            <div className={styles.spinningEmoji} aria-hidden="true">🎪</div>
            <p>Generando superpoder épico...</p>
          </div>
        )}

        <ol className={styles.instructions} aria-label="Instrucciones">
          <li>¡Descubre tu <code>superpoder único</code> en cada click! 🎲</li>
          <li>Colecciona superpoderes y encuentra los legendarios ⭐</li>
        </ol>

        <nav className={styles.ctas} aria-label="Acciones principales">
          <button
            onClick={generateRandomPower}
            disabled={isGenerating}
            aria-disabled={isGenerating}
            className={styles.primaryBtn}
          >
            {isGenerating ? "🎲 Generando..." : "🚀 ¡Nuevo Superpoder!"}
          </button>

          <a href="#powers-collection" className={styles.secondaryBtn} tabIndex={0}>
            📚 Mi Colección
          </a>
        </nav>

        <button className={styles.secondaryBtn} style={{ marginTop: "2rem" }}>
          🎯 ¡Tienes superpoderes únicos aquí!
        </button>
      </main>

      <footer className={styles.footer}>
        <a href="/gallery" className={styles.footerLink}>
          <Image aria-hidden src="/window.svg" alt="Icono de ventana" width={16} height={16} />
          🎨 Galería de Poderes
        </a>
        <a href="/leaderboard" className={styles.footerLink}>
          <Image aria-hidden src="/globe.svg" alt="Icono de globo terráqueo" width={16} height={16} />
          🏆 Ranking de Héroes →
        </a>
      </footer>
    </div>
  );
}
