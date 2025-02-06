import DefaultLayout from "@/layouts/default.tsx";
import Profile from "@/components/profile.tsx";

function profilePage(){
    return(
        <DefaultLayout>
            <Profile/>
        </DefaultLayout>
    );
}

export default profilePage;