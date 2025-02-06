import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "@/firebase/firebase.ts";
import { doUpdateProfile } from "../firebase/auth";
import {Input} from "@heroui/input";
import {Form} from "@heroui/form";
import {Button} from "@heroui/button";

function profile() {
    const [nameInput, setNameInput] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser?.displayName)  setNameInput(currentUser.displayName);
        });

        return () => unsubscribe();
    }, []);

    const handleProfileUpdate = async () => {
        try {
            await doUpdateProfile(nameInput, "");
            alert("Profil erfolgreich aktualisiert!");
        } catch (error) {
            console.error("Fehler beim Update:", error);
        }
    };

    return (
        <main className={"main"}>
        <div className={"form"}>
            <Form validationBehavior="native" onSubmit={handleProfileUpdate}></Form>
            <h1>Edit your profile information below</h1>
            <Input className={"margin-profile"} label={"Name"}  value={nameInput} onChange={(e) => (setNameInput(e.target.value))}/>
            <Button type={"submit"} onPress={handleProfileUpdate}>Submit</Button>
        </div>
        </main>
    );
}

export default profile;