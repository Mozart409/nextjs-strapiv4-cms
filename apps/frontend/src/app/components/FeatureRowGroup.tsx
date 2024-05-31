import classNames from 'classnames'
import CustomLink from './elements/custom-link'
import NextImage from './elements/image'
import Video from './elements/video'

export interface IFeatureRowsGroup {
  data: {
    id: number
    __component: string
    features: Feature[]
  }
}

export interface Feature {
  id: number
  title: string
  description: string
  media: Media
  link: Link
}

export interface Media {
  data: Data
}

export interface Data {
  id: number
  attributes: Attributes
}

export interface Attributes {
  name: string
  alternativeText: any
  caption: any
  width: number
  height: number
  formats: Formats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: any
  provider: string
  provider_metadata: any
  createdAt: string
  updatedAt: string
}

export interface Formats {
  thumbnail: Thumbnail
}

export interface Thumbnail {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: any
  size: number
  width: number
  height: number
}

export interface Link {
  id: number
  url: string
  newTab: boolean
  text: string
}

const FeatureRowsGroup = ({ data }: IFeatureRowsGroup) => {
  return (
    <div className="container flex flex-col gap-12 py-12">
      {data.features.map((feature, index) => (
        <div
          className={classNames(
            // Common classes
            'flex flex-col justify-start gap-10 md:items-center md:justify-between',
            {
              'lg:flex-row': index % 2 === 0,
              'lg:flex-row-reverse': index % 2 === 1
            }
          )}
          key={feature.id}
        >
          <div className="w-full text-lg lg:w-6/12 lg:pr-6">
            <h3 className="title">{feature.title}</h3>
            <p className="my-6">{feature.description}</p>
            <CustomLink link={feature.link}>
              <div className="with-arrow text-primary-600 hover:underline">
                {feature.link.text}
              </div>
            </CustomLink>
          </div>
          {/* {console.debug(feature.media.data.attributes.mime)} */}
          <div className="sm:9/12 max-h-full w-full lg:w-4/12">
            {feature.media.data.attributes.mime.startsWith('image') && (
              <div className="h-auto w-full">
                <NextImage
                  media={feature.media}
                  className="rounded"
                  width={256}
                  height={256}
                />
              </div>
            )}

            {feature.media.data.attributes.mime.startsWith('video') && (
              <Video
                media={feature.media}
                className="h-auto w-full"
                autoPlay
                controls={false}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
export default FeatureRowsGroup
