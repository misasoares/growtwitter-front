


interface AssuntosProps {
  subtitulo: string | null;
  titulo: string | null;
  link: string | null 
}


export default function Assuntos({ subtitulo, titulo, link }: AssuntosProps) { 
 
console.log(link, "link")
 
  return (
    <>
      <div style={{ margin: "20px" }}>
        <p style={{ margin: "0px", color: "#b0b0b0", fontSize: "1rem" }}>{subtitulo}</p>
        
        <a style={{textDecoration:'none', color:'black'}} href={link ? link : ""} target="_blank"><h3 style={{ margin: "0px", fontSize: "1.12rem" }}>{titulo}</h3></a>
      </div>
    </>
  );
}
