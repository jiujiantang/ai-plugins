export function formatTime(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
    const s = totalSeconds % 60;
    const m = Math.floor(totalSeconds / 60) % 60;
    const h = Math.floor(totalSeconds / 3600) % 24;
    const d = Math.floor(totalSeconds / 86400);

    const formattedS = String(s).padStart(2, '0');
    const formattedM = String(m).padStart(2, '0');
    const formattedH = String(h).padStart(2, '0');
    const formattedD = String(d);

    return `${formattedD},${formattedH},${formattedM},${formattedS}`;
}
