import { Redirect, Tabs } from "expo-router";

export default function Layout() {

   const isLoggedIn = true; 
      if (!isLoggedIn) {
       return <Redirect href={'/login'}  />
    }
      
  return (
    <Tabs>
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="contacts" options={{ title: "Contacts" }} />
    </Tabs>
  )
}
