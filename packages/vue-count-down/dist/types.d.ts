export default interface CountdownProType {
    keyName: string;
    end: number;
    autoStart: boolean;
    onFinish: () => void;
}
