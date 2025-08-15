import DefaultLayout from '../layouts/default';
import {Divider} from '@heroui/divider';
import AllPlayersComponent from "../components/stats/players";
import BestStatsComponent from "../components/stats/bestof";

export default function PlayerPage() {
    return (
        <DefaultLayout title={'Player Stats'}>
            <BestStatsComponent/>
            <Divider className="mb-8"/>
            <div className={'text-2xl font-bold z-50 h-16 w-full md'}>All players</div>
            <AllPlayersComponent/>
        </DefaultLayout>
    );
}