import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Stark Industries Interface</title>
        <meta name="description" content="A J.A.R.V.I.S. inspired UI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.pageContainer}>
        {/* RESTORED: Full-height vertical lines */}
        <div className={`${styles.verticalLine} ${styles.lineOne}`}></div>
        <div className={`${styles.verticalLine} ${styles.lineTwo}`}></div>

        {/* Top Navigation Bar */}
        <header className={styles.topBar}>
          <Link href="/todo">TO-DO</Link>
          <Link href="/marvel-quiz">MARVEL QUIZ</Link>
          <Link href="/marvel-match">MARVEL MATCHING</Link>
        </header>

        {/* RESTORED: Central Floating Text */}
        <main className={styles.hudContainer}>
          <Link href="/todo" className={styles.hudLink}>
            TASK MATRIX
            {/* RESTORED: Scanner element */}
            <span className={styles.scanner}></span>
          </Link>
          <Link href="/marvel-quiz" className={styles.hudLink}>
            TEST YOUR KNOWLEDGE
            <span className={styles.scanner}></span>
          </Link>
          <Link href="/marvel-match" className={styles.hudLink}>
            MEMORY MATRIX
            <span className={styles.scanner}></span>
          </Link>
        </main>
      </div>
    </>
  );
}