
import { collection } from "firebase/firestore"
import { useFirestore, useCollection } from "vuefire"


export default function userProperties() {

    const db = useFirestore()
    const propertiesColletion = useCollection(collection(db, 'properties'))

    return {
        propertiesColletion
    }
}