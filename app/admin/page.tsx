import Usercard from "@/app/components/Usercard";


export default function page() {
  return (
    <div className="p-4 flex gap-4 flex-col">
      {/* left */}
      
        <Usercard type="users" />
        
      {/* left */}
    </div>
  );
}