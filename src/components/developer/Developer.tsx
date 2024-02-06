import { FollowUs } from '../followUs/FollowUs';
import { Dollar } from '../icons/dollar';
import { Door } from '../icons/door';
import { Location } from '../icons/location';
import { Tick } from '../icons/tick';
import s from './Developer.module.scss';
import { vacancies } from '@/mock/vacancies';
export const Developer = () => {

  const currentVac = vacancies[0]
  return (
    <section className={`${s.developer} container`}>
      <h2 className={s.developer__title}>{currentVac.title}</h2>

      <div className={s.developer__grid}>
        <div className={s.developer__grid_cell}>
          <Door />
          <span>{currentVac.company}</span>
        </div>


        <div className={s.developer__grid_cell}>
          <Location />
          <span>{currentVac.location}</span>
        </div>


        <div className={s.developer__grid_cell}>
          <Dollar />
          <span>{currentVac.salary} / year</span>

        </div>

        {currentVac.status === 'Closed' && <div className={`${s.developer__grid_cell} ${s.developer__grid_cell_closed}`}>
          <Tick />
          <span>{currentVac.status}</span>
        </div>}

        {currentVac.status !== 'Closed' &&
          <div className={s.developer__grid_open}>
            <div className={`${s.developer__grid_cell} ${s.developer__grid_cell_open}`}>
              <Tick />
              <span>Open</span>
            </div>
            <button className={s.developer__grid_cell_btn}>Apply</button>
          </div>
        }

      </div>

      <h3 className={s.developer__subtitle}>About</h3>
      <h4 className={s.developer__title_list}>Job Requirements</h4>
      <ul className={s.developer__list}>
        <li className={s.developer__list_item}>3+ years of experience with AWS or GCP to architect solid infrastructure built for resilience, security and cost optimisation.</li>
        <li className={s.developer__list_item}>2+ years of experience in coding in at least one modern language such as Node.js, Python and Go.
        </li>
        <li className={s.developer__list_item}>Experienced in using tools/frameworks for modern infrastructure provisioning, monitoring and application deployment</li>
        <li className={s.developer__list_item}>Skilled in bash scripting and general linux commands
        </li>
        <li className={s.developer__list_item}>Understands essential security practices in managing servers and networks.
        </li>
        <li className={s.developer__list_item}>Eager to learn new skills and self-motivated in keeping up with the latest trends in DevOps & system architecture</li>
        <li className={s.developer__list_item}>Startup mindset, ownership, and a proper balance of quality and sense of urgency!
        </li>
        <li className={s.developer__list_item}>Integrity, ethical standards and sound judgment.</li>
        <li className={s.developer__list_item}>Good organizational and communication skills</li>
        <li className={s.developer__list_item}>Interest in blockchain is a must.</li>
      </ul>
      <h4 className={s.developer__title_list}>Job Responsibilities</h4>
      <ul className={s.developer__list}>
        <li className={s.developer__list_item}>To build, maintain, document, and animate all validators needs
        </li>
        <li className={s.developer__list_item}>Study all blockchain networks to connect with and create tools to manage at scale
        </li>
        <li className={s.developer__list_item}>Research the newest code and understand its roadmap, to be on the cutting edge of blockchain technology</li>
        <li className={s.developer__list_item}>Study latest blockchain developments and consider future implications to the broader ecosystem
        </li>
        <li className={s.developer__list_item}>Success means establishing & coordinating a resilient, decentralized and secure blockchain network.
        </li>

      </ul>
      <button className={s.developer__btn}>Apply</button>

      <div className={s.developer__follow}>
        <FollowUs mode='dark' />
      </div>

    </section>
  )
}