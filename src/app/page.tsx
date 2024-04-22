import {ClientUi} from "@/app/ui/clientUi";
import {getRawRecipes} from "@/app/lib/recipes/utils";

export default function Home() {
  return (
    <main>
      <ClientUi rawRecipesMap={getRawRecipes()}/>
    </main>
  );
}
