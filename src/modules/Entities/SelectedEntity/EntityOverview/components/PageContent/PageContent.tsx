import React from 'react'
import { PageContent as PageContentType } from 'common/api/blocksync-api/types/page-content'
import { ProfileCardsWrapper } from './PageContent.styles'
import BodyContentCard from '../BodyContentCard/BodyContentCard'
import ImageContentCard from '../ImageContentCard/ImageContentCard'
import ProfileCard from '../ProfileCard/ProfileCard'
import Header from '../Header/Header'
import EmbeddedContentCard from '../EmbeddedContentCard/EmbeddedContentCard'
import Footer from '../Footer/Footer'

interface Props {
  creatorName: string
  creatorMission: string
  creatorLogo: string
  creatorWebsite: string
  pageContent: PageContentType
}

const PageContent: React.FunctionComponent<Props> = ({
  pageContent,
  creatorName,
  creatorMission,
  creatorLogo,
  creatorWebsite,
}) => {
  const renderHeader = (): JSX.Element => {
    const { title, image, imageDescription } = pageContent.header
    return (
      <Header name={title} image={image} imageDescription={imageDescription} />
    )
  }

  const renderBodySections = (): JSX.Element => {
    const { body } = pageContent

    return (
      <>
        {body.map((bodySection, index) => {
          const { image, content, title } = bodySection
          return (
            <BodyContentCard
              key={index}
              image={image}
              content={content}
              title={title}
            />
          )
        })}
      </>
    )
  }

  const renderImageSections = (): JSX.Element => {
    const { images } = pageContent

    return (
      <>
        {images.map((imageSection, index) => {
          const { image, content, title, imageDescription } = imageSection
          return (
            <ImageContentCard
              key={index}
              image={image}
              content={content}
              title={title}
              imageDescription={imageDescription}
            />
          )
        })}
      </>
    )
  }

  const renderProfiles = (): JSX.Element => {
    const { profiles } = pageContent

    return (
      <ProfileCardsWrapper>
        {profiles.map((profile, index) => {
          const { image, name, position, linkedInUrl, twitterUrl } = profile
          return (
            <ProfileCard
              key={index}
              image={image}
              name={name}
              position={position}
              linkedInUrl={linkedInUrl}
              twitterUrl={twitterUrl}
            />
          )
        })}
      </ProfileCardsWrapper>
    )
  }

  const renderEmbeddedContent = (): JSX.Element => {
    const { embedded } = pageContent

    return (
      <>
        {embedded.map((content, index) => {
          const { title, urls } = content
          return <EmbeddedContentCard key={index} title={title} urls={urls} />
        })}
      </>
    )
  }

  const renderFooter = (): JSX.Element => {
    const {
      social: {
        discourseUrl,
        facebookUrl,
        githubUrl,
        instagramUrl,
        linkedInUrl,
        otherUrl,
        telegramUrl,
        twitterUrl,
      },
    } = pageContent

    return (
      <Footer
        creatorLogo={creatorLogo}
        creatorMission={creatorMission}
        creatorName={creatorName}
        creatorWebsite={creatorWebsite}
        discourseUrl={discourseUrl}
        facebookUrl={facebookUrl}
        githubUrl={githubUrl}
        instagramUrl={instagramUrl}
        linkedInUrl={linkedInUrl}
        otherUrl={otherUrl}
        telegramUrl={telegramUrl}
        twitterUrl={twitterUrl}
      />
    )
  }

  return (
    <div>
      {renderHeader()}
      {renderBodySections()}
      {renderImageSections()}
      {renderProfiles()}
      {renderEmbeddedContent()}
      {renderFooter()}
    </div>
  )
}

export default PageContent
