import {Card, CardBody, CardHeader} from "@heroui/card";
import {Divider} from "@heroui/divider";

export const StatCard = ({
                             title,
                             value,
                             icon,
                             playerName,
                             sPlayerName,
                             sPlayerValue,
                             tPlayerName,
                             tPlayerValue
                         }: {
    title: string;
    value: string;
    icon: React.ReactNode;
    playerName: string;
    sPlayerName?: string;
    sPlayerValue?: string;
    tPlayerName?: string;
    tPlayerValue?: string;
}) => (
    <Card className="mb-4 border-none shadow-lg dark:bg-zinc-900 text-center">
        <CardHeader className="flex flex-col items-center justify-center">
            {icon}
            <p className="text-lg font-semibold">{title}</p>
        </CardHeader>
        <Divider/>
        <CardBody>
            <div className={"flex justify-between text-2xl font-bold"}>
                <p>{playerName}</p>
                <p>{value}</p>
            </div>
            <div className="text-sm text-zinc-500">
                <div className={"flex justify-between"}>
                    <p>{sPlayerName}</p>
                    <p>{sPlayerValue}</p>
                </div>
                <div className={"flex justify-between"}>
                    <p>{tPlayerName}</p>
                    <p>{tPlayerValue}</p>
                </div>
            </div>
        </CardBody>
    </Card>
);