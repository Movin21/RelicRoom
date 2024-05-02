
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Section2 = () => {
  return (
    <div className="bg-gray-100 ">
      <div className="relative bg-gray-100 px-6 pt-10 pb-20 lg:px-8 lg:pt-18 lg:pb-28">
        <h1 className="text-3xl font-amethysta mb-20 font-semibold text-primary">
          Blogs and Stories
        </h1>
        <div className="absolute inset-0">
          <div className="h-1/3 sm:h-2/3"></div>
        </div>
        <div className="relative mx-auto max-w-7xl bg-gray-100">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Latest Blogs
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-500 sm:mt-4">
              Discover the Latest Insights: Our Newest Blog Posts
            </p>
          </div>
          
          <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
            {/* First Blog Card */}
            <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="flex-shrink-0">
               
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600">
                    <a href="#" className="hover:underline">
                      Article
                    </a>
                  </p>
                  <a href="#" className="mt-2 block">
                    <p className="text-xl font-semibold text-gray-900">
                      The Mona Lisa digitally retouched to reduce the effects of aging; the unretouched image is slightly darker.
                    </p>
                    <p className="mt-3 text-base text-gray-500">
                      The painting has been traditionally considered to depict the Italian noblewoman Lisa del Giocondo. It is painted in oil on a white Lombardy poplar panel. Leonardo never gave the painting to the Giocondo family.Leonardo da Vinci commenced the creation of the Mona Lisa in the early 16th century, during the Italian Renaissance—a period characterized by cultural rebirth and artistic innovation. Commissioned by Francesco del Giocondo, a Florentine merchant, the painting is believed to depict Lisa Gherardini, Francesco's wife. However, the identity of the subject remains a subject of speculation, adding another layer of intrigue to the artwork.
                    </p>
                  </a>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <a href="#">
                      <span className="sr-only">Author</span>
                     
                    </a>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      <a href="#" className="hover:underline">
                        
                      </a>
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime="2020-03-16">Mar 16, 2020</time>
                      <span aria-hidden="true">·</span>
                      <span>12 min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Second Blog Card */}
            <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="flex-shrink-0">
                
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600">
                    <a href="#" className="hover:underline">
                      Article
                    </a>
                  </p>
                  <a href="#" className="mt-2 block">
                    <p className="text-xl font-semibold text-gray-900">
                      Victorian fashion, 1844 fashion plate depicting fashionable clothing for men and women.
                    </p>
                    <p className="mt-3 text-base text-gray-500">
                      Victorian fashion consists of the various fashions and trends in British culture that emerged and developed in the United Kingdom and the British Empire throughout the Victorian era, roughly from the 1830s through the 1890s.At the outset of the Victorian era, fashion was characterized by elaborate, highly structured garments that emphasized modesty and propriety. Women's attire featured corsets, crinolines, and layers of fabric, creating a silhouette that accentuated a tiny waist and a full skirt. The idealized feminine form was one of delicate fragility, with women expected to embody notions of virtue and purity.
                    </p>
                  </a>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <a href="#">
                      <span className="sr-only">Author</span>
                      
                    </a>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      <a href="#" className="hover:underline">
                        
                      </a>
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime="2020-03-16">Jan 28, 2024</time>
                      <span aria-hidden="true">·</span>
                      <span>23 min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Third Blog Card */}
            <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="flex-shrink-0">
               
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600">
                    <a href="#" className="hover:underline">
                      Article
                    </a>
                  </p>
                  <a href="#" className="mt-2 block">
                    <p className="text-xl font-semibold text-gray-900">
                      Jewels of Elizabeth II, Queen Elizabeth II wearing the Kokoshnik Tiara, diamond earrings, a diamond necklace and bracelet.
                    </p>
                    <p className="mt-3 text-base text-gray-500">
                      The origin of a distinct royal jewel collection is vague, though it is believed the jewels have their origin somewhere in the 16th century. Many of the pieces are from overseas.Complementing the Kokoshnik Tiara are Queen Elizabeth II's exquisite diamond earrings, necklace, and bracelet, each a testament to the craftsmanship and artistry of the finest jewelers. The diamond earrings, featuring dazzling gemstones set in delicate platinum settings, frame the Queen's face with an aura of brilliance and elegance.
                    </p>
                  </a>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <a href="#">
                      <span className="sr-only">Author</span>
                    
                    </a>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      <a href="#" className="hover:underline">
                        
                      </a>
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime="2020-03-16">Dec 07, 2023</time>
                      <span aria-hidden="true">·</span>
                      <span>09 min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

          
      </div>
      {/* Add "View Blogs" button */}
      <div className="text-center mt-8">
        {/* Correctly close the Link component */}
        <Link to="/blog/View">
          <button className="bg-primary text-white px-6 py-3 rounded-md shadow-md hover:bg-primary-dark transition duration-300">
            View Blogs
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Section2;
