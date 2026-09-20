import { Fragment } from 'react'
import './PageHeader.css'

function PageHeader({
  crumb,
  kicker,
  kickerMeta,
  title,
  titleId,
  lead,
  actions,
  src,
  position,
}) {
  return (
    <section className="page-hero" aria-labelledby={titleId}>
      <div className="page-hero__media" aria-hidden="true">
        <img
          src={src}
          alt=""
          style={position ? { objectPosition: position } : undefined}
        />
      </div>
      <div className="page-hero__copy container">
        <div>
          {crumb?.length ? (
            <p className="page-hero__crumb">
              {crumb.map((item, index) => (
                <Fragment key={item.label}>
                  {index > 0 ? <span>/</span> : null}
                  {item.href ? <a href={item.href}>{item.label}</a> : item.label}
                </Fragment>
              ))}
            </p>
          ) : null}
          {kicker ? (
            <p className="page-hero__kicker">
              {kicker}
              {kickerMeta ? <span>{kickerMeta}</span> : null}
            </p>
          ) : null}
          <h1 className="page-hero__title" id={titleId}>
            {title}
          </h1>
        </div>
        {lead || actions ? (
          <div className="page-hero__side">
            {lead ? <p className="page-hero__lead">{lead}</p> : null}
            {actions ? <div className="page-hero__actions">{actions}</div> : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default PageHeader
