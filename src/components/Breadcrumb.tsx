import BreadcrumbBootstrap from "react-bootstrap/Breadcrumb"
import NextLink from "next/link"

interface BreadcrumbProps {
  items: {
    name: string 
    url: string 
  }[]
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <BreadcrumbBootstrap>
      {items.map((item, index) => (
        <NextLink href={item.url} key={index}>
          <BreadcrumbBootstrap.Item 
            href={item.url} 
            active={(items.length - 1 === index)}
          >
            {item.name}
          </BreadcrumbBootstrap.Item>
        </NextLink>
      ))}
    </BreadcrumbBootstrap>
  )
}

export default Breadcrumb