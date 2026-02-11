import React from "react";

export interface EventData {
  id: string; // Unique identifier for each event
  eventname: string;
  category: string;
  description: string;
  image: string;
  rules: React.ReactNode; // Allows JSX like <li> elements
}

export const mockData: EventData[] = [
  {
    id: "battle of bands",
    eventname: "Battle of Bands",
    category: "FLAGSHIP EVENTS",
    description:
      "Battle of the Bands is a competitive musical showdown where registered bands perform live on stage. The event aims to celebrate talent, creativity, teamwork, and stage presence.",
    image: "",
    rules: (
      <>
        <div
          title="Rules of Battle of Bands"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          className="space-y-2 rounded-md border-2 p-4 transition-all duration-300"
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 1 :{" "}
            </span>{" "}
            Strictly no explicit language, obscene gestures, or disrespectful behavior on stage.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 2 :{" "}
            </span>{" "}
            Any damage to instruments or stage property will be fined to the band.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 3 :{" "}
            </span>{" "}
            Bands must adhere to the time slots and respect the flow of the event.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 4 :{" "}
            </span>{" "}
            Use of pre-recorded backing tracks is allowed only for ambient effects, not for replacing core instruments or vocals.
          </p>
        </div>
        <p
          className=" mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra " style={{ letterSpacing: "1px" }}>
            PRIZE MONEY :{" "}
          </span>{" "}

        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
            VENUE :{" "}
          </span>{" "}
          Open Air Theatre.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
            CONTACT :{" "}
          </span>{" "}
          <div className="pl-5">
            Priyanshu Dev (7307834859),
            Shreya Sharma (7033618603)
          </div>
        </p>
      </>
    ),
  },

  {
    id: "move mayhem",
    eventname: "MOVE MAYHEM",
    category: "Dance",
    description:
      "Move Mayhem is CULFEST's ultimate high-octane dance battle designed to test spontaneity, creativity, stage confidence, and adaptability. The competition progresses through intense face-offs and a prop-based solo challenge, pushing dancers to deliver their best under pressure.",
    image: "",
    rules: (
      <>
        <div
          title="Rules of Move Mayhem"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          className="space-y-2 rounded-md border-2 p-4 transition-all duration-300"
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 1 :{" "}
            </span>{" "}
            Round 1 - Team Face-Off
            <div className="pl-5">
              All registered dancers assemble on stage. <br />
              Two teams, Team A and Team B, are formed by designated team leaders. <br />
              A song is played, and within five seconds, each team must send one dancer for a face-off. <br />
              Each dancer is allowed to perform only once in this round. <br />
              Judges shortlist the top performers for Round 2. <br />
              Performance time for each dancer in this round is one to two minutes.
            </div>

          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 2 :{" "}
            </span>{" "}
            Round 2 – Prop Solo Challenge (Final Round)
            <div className="pl-5">
              Selected dancers perform solo. <br />
              A random prop is provided by the organizers. <br />
              The prop must be incorporated creatively into the performance. <br />
              Any dance style is allowed. <br />
              Performance time for each dancer in this round is one to two minutes.
            </div>
          </p>
        </div>
        <p
          className=" mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra " style={{ letterSpacing: "1px" }}>
            PRIZE MONEY :{" "}
          </span>{" "}
          Rs 14,000
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
            VENUE :{" "}
          </span>{" "}
          Open Air Theatre.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
            CONTACT :{" "}
          </span>{" "}
          <div className="pl-5">
            Bhumika(8219158503),
            Divya Pratap(9244099734)
          </div>
        </p>
      </>
    ),
  },

  {
    id: "style shuffle",
    eventname: "STYLE SHUFFLE",
    category: "Dance",
    description:
      "Style Shuffle is a dynamic dance competition that challenges performers to first showcase their strongest style and then test their versatility through an unexpected style twist. The event celebrates adaptability, creativity, expressions, and the ability to own any dance form with confidence.",
    image: "",
    rules: (
      <>
        <div
          title="Rules of Style Shuffle"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          className="space-y-2 rounded-md border-2 p-4 transition-all duration-300"
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 1 :{" "}
            </span>{" "}
            Round 1 - Free-Style Performance
            <div className="pl-5">
              Participants may perform solo, duo, trio, or as a team. <br />
              Any dance form and music of the participant’s choice is allowed. <br />
              Performers must present their best skills, originality, and stage confidence. <br />
              Judges will shortlist participants for Round 2. <br />
              The performance time for each performance is two to three minutes.
            </div>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 2 :{" "}
            </span>{" "}
            Round 2 – Style Twist Challenge (Final Round)
            <div className="pl-5">
              Only shortlisted participants from Round 1 will compete in this round. <br />
              A common song will be provided by the organizers. <br />
              Each dancer will pick a chit containing a random dance style such as Hip-Hop, Contemporary, Locking, Bharatanatyam, Bollywood, or others.<br />
              The dancer must perform the assigned style on the given song using creativity and personal interpretation. <br />
              The performance time for each dancer in this round is one to two minutes.
            </div>
          </p>
        </div>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra " style={{ letterSpacing: "1px" }}>
            PRIZE MONEY :{" "}
          </span>{" "}
          Rs 21,000
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
            VENUE :{" "}
          </span>{" "}
          Open Air Theatre.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
            CONTACT :{" "}
          </span>{" "}
          <div className="pl-5">
            Divya Pratap(9244099734),
            Bhumika(8219158503)
          </div>
        </p>
      </>
    ),
  },

  {
    id: "rangmunch",
    eventname: "RANGMANCH",
    category: "Dramatics",
    description:
      "The skit competition allows teams to showcase their creativity and acting skills through short dramatic performances. The focus is on storytelling , dialogue delivery ,and audience engagement",
    image: "/Event_03-5pCd__fD.jpg",
    rules: (
      <>
        <div
          title="Rules of Rangmanch"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          className="space-y-2 rounded-md border-2 p-4 transition-all duration-300"
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 1 :{" "}
            </span>{" "}
            Team performances only.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 2 :{" "}
            </span>{" "}
            Team must have at least 5 members and than 15 members.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 3 :{" "}
            </span>{" "}
            Participants may perform a skit or stage play of any genre such as drama, comedy, social issue, or fantasy.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 4 :{" "}
            </span>{" "}
            Use of props, costumes, background music, and lighting is allowed.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 5 :{" "}
            </span>{" "}
            Scripts may be original or adapted, but must not include plagiarism of copyrighted material without permission.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 6 :{" "}
            </span>{" "}
            Use of offensive language, political propaganda, religious insensitivity, or inappropriate content is strictly prohibited.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 7 :{" "}
            </span>{" "}
            Exceeding the time limit may lead to penalty or disqualification.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 8 :{" "}
            </span>{" "}
            Teams must be present backstage at least 15 minutes before their scheduled performance.
          </p>
        </div>
        <p
          className=" mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra " style={{ letterSpacing: "1px" }}>
            PRIZE MONEY :{" "}
          </span>{" "}
          Rs 18,000
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
            VENUE :{" "}
          </span>{" "}
          Open Air Theatre.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
            CONTACT :{" "}
          </span>{" "}
          <div className="pl-5">
            Pranav Vishal-9279995985
          </div>
        </p>
      </>
    ),
  },

  {
    id: "unsung wonders of the world",
    eventname: "UNSUNG WONDERS OF THE WORLD",
    category: "Quizzing",
    description: `"
              Unsung Wonders of the World is a theme-based academic
              quiz that explores lesser-known architectural marvels,
              natural formations, ancient engineering feats, and
              culturally significant sites beyond the conventional “Seven
              Wonders” lists.
    "`,
    image: "/qor.jpg",
    rules: (
      <>
        <div
          title="Event Overview"
          className="space-y-2 rounded-md border-2 p-4 transition-all duration-300"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">EVENT OVERVIEW: </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              The event is titled Unsung Wonders of the World. It is conducted in teams of two participants each.
            </span>{" "}
          </p>
        </div>
        <div
          title="Registration Rules"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              REGISTRATION RULES :{" "}
            </span>{" "}
            The quiz is open to all currently enrolled undergraduate and postgraduate students. Registration must be completed before the announced deadline. Each team must consist of exactly two members, and a participant may be part of only one team. No change in team composition will be allowed after registration closes.
          </p>
        </div>
        <div
          title="Event Overview"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              EVENT STRUCTURE :{" "}
            </span>{" "}
            The competition consists of two rounds.
            <div className="pl-5">
              The Preliminary Round is a written quiz consisting of 20 questions with a duration of 30 minutes. There is no negative marking, and the top eight teams qualify for the finals. <br />
              The On-Stage Finals is a live quiz conducted on stage and includes pounce-and-bounce and buzzer-based rounds. Questions may involve visuals, clues, and direct questioning. Detailed scoring rules will be announced before the finals.
            </div>
          </p>
        </div>
        <div
          title="Quiz rules and regulations"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              QUIZ RULES AND REGULATIONS:{" "}
            </span>{" "}
            1. The use of electronic devices during the quiz is strictly prohibited. <br />
            2. Answers, once submitted or spoken, cannot be changed. <br />
            3. Only the team member who buzzes is allowed to answer. <br />
            4. Teams must strictly adhere to the given time limits.
          </p>
        </div>
        <div
          title="code of conduct"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              CODE OF CONDUCT :{" "}
            </span>{" "}
            Participants are expected to maintain discipline and sportsmanship throughout the event. Any form of cheating or misconduct will lead to disqualification. The organizers reserve the right to modify rules if required. Decisions of the quizmaster and organizers will be final.
          </p>
        </div>

        <div
          title="General Rules and Regulations"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">
              GENERAL RULES AND REGULATIONS :{" "}
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            1. Teams are expected to adhere to the principles of fair play and
            sportsmanship.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            2. Any form of cheating or plagiarism will result in immediate
            disqualification.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            The decisions of the organizers and quizmasters are final and
            binding.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            For any queries or concerns,participants can contact the event
            organizers.
          </p>
        </div>

        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
            PRIZE MONEY :{" "}
          </span>{" "}
          Rs 13,000.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
            VENUE:{" "}
          </span>{" "}
          Diamond JUbilee Lecture Hall Complex.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
            {" "}
            Contact :{" "}
          </span>{" "}
          Abhinav Saharia (9748582775)
        </p>
      </>
    ),
  },

  {
    id: "india quiz - a journey through the nation",
    eventname: "INDIA QUIZ - A JOURNEY THROUGH THE NATION",
    category: "Quizzing",
    description: `"
              India Quiz - A Journey Through the Nation is a competitive
              quiz designed to explore the country beyond conventional
              timelines and geography. The quiz examines India through its
              lesser-known histories, cultural layers, modern
              transformations, public policy, and popular culture, providing
              participants with a comprehensive and engaging intellectual 
              experience.
      "`,
    image: "/quiz2.avif",
    rules: (
      <>
        <div
          title="Event genre"
          className="space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">EVENT GENRE : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              The quiz focuses on India’s history, culture, society, governance, economy, science, and popular culture.
            </span>{" "}
          </p>
        </div>

        <div
          title="Event duration"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">EVENT DURATION :  </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              Preliminary Round: 30 minutes <br /> Final Round: 45 minutes
            </span>{" "}
          </p>
        </div>

        <div
          title="Event structure"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">EVENT STRUCTURE : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              Round 1 - Preliminary Round
              <div className="pl-5">
                1. Written elimination round consisting of 20 questions. <br />
                2. Questions cover ancient to modern India, including mainstream narratives and lesser-known stories. <br />
                3. The top 8 highest-scoring teams qualify for the finals.
              </div>
            </span>{" "}
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              Round 2 - On-Stage Finals
              <div className="pl-5">
                1. Live quiz conducted before an audience. <br />
                2. Includes pounce-and-bounce rounds and recall-based formats. <br />
                3. Final scoring and round formats will be explained prior to commencement.
              </div>
            </span>{" "}
          </p>
        </div>

        <div
          title="Rules and Regulations"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">
              RULES AND REGULATIONS :{" "}
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            1. Use of electronic devices is strictly prohibited unless explicitly permitted.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            2. Answers, once submitted or announced, cannot be changed.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            3. Teams must follow the quizmaster’s instructions times.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            4. Any form of malpractice or misconduct will result in immediate disqualification.
          </p>
        </div>

        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
            PRIZE MONEY :{" "}
          </span>{" "}
          Rs 12,000.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
            VENUE:{" "}
          </span>{" "}
          Diamond JUbilee Lecture Hall Complex.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            Contact :{" "}
          </span>{" "}
          Amit Choudhary (9608090726)
        </p>
      </>
    ),
  },

  {
    id: "jagruti",
    eventname: "JAGRUTI",
    category: "Dramatics",
    description:
      "Nukkad, a street play competition, focuses on raising awareness about pressing social issues through the medium of impactful performances in open spaces. It encourages participants to use humor, drama, and emotion to engage the audience and deliver a strong message.",
    image: "/Event_03-5pCd__fD.jpg",
    rules: (
      <>
        <div
          title="Rules of Jagruti"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          className="space-y-2 rounded-md border-2 p-4 transition-all duration-300"
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 1 :{" "}
            </span>
            Only team performances are allowed.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 2 :{" "}
            </span>
            Each team must have a minimum of 10 members and a maximum of 18 members.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 3 :{" "}
            </span>
            The use of props, placards, costumes, and musical instruments is allowed but should be minimal and suitable for a street play format.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 4 :{" "}
            </span>
            The performance must rely mainly on acting, dialogue, and expressions rather than technical effects.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 5 :{" "}
            </span>
            The explicit use of offensive language, political propaganda, religious insensitivity, or inappropriate content is strictly prohibited.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 6 :{" "}
            </span>
            The play should be suitable for a public audience.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 7 :{" "}
            </span>
            Teams must report to the venue at least 30 minutes before their performance slot.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 8 :{" "}
            </span>
            Exceeding the time limit may result in point deduction or disqualification.
          </p>
        </div>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
            PRIZE MONEY :{" "}
          </span>
          Rs 22,000.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
            VENUE :{" "}
          </span>
          Open Air Theatre.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
            CONTACT :{" "}
          </span>
          <div className="pl-5">
            Subham Panigrahi-8260343089
          </div>
        </p>
      </>
    ),
  },

  {
    id: "panch parmeshwar",
    eventname: "PANCH PARMESHWAR",
    category: "Dramatics",
    description:
      "Panch Parmeshwar is a debate-style event governed by the sarpanch where two sides present their points in a comical manner. The topic is provided by the sarpanch at the moment, ensuring spontaneity and humor in the discussions.",
    image: "/Event_03-5pCd__fD.jpg",
    rules: (
      <>
        <div
          title="Rules of Panch Parmeshwar"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          className="space-y-2 rounded-md border-2 p-4 transition-all duration-300"
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 1 :
            </span>{" "}
            The debate must be conducted in Hindi.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 2 :
            </span>{" "}
            Each side is given 5 minutes to present their points.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 3 :
            </span>{" "}
            The sarpanch will moderate the debate and ensure decorum is
            maintained.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 4 :
            </span>{" "}
            Humor should be lighthearted and non-offensive.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 5 :
            </span>{" "}
            Teams can use minimal props if necessary.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 6 :
            </span>{" "}
            Teams must consist of 4 - 6 members.
          </p>
        </div>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
            PRIZE MONEY :
          </span>{" "}
          Rs 10,000.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
            VENUE :
          </span>{" "}
          Open Air Theatre.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
            CONTACT :
          </span>{" "}
          SHREYA PRIYADARSHINI (9431508984)
        </p>
      </>
    ),
  },

  {
    id: "choreo nights",
    eventname: "CHOREO NIGHTS",
    category: "Dance",
    description:
      "Synchronize your steps to the beats. Come to the CULFEST and let your team create to win hearts. This gala event promises to give you lifelong memories.",
    image: "/dance1.webp",
    rules: (
      <>
        <div
          title="Rules of Choreo Nights"
          className="space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 1 :{" "}
            </span>{" "}
            A team can consist of a minimum of 8 and a maximum of 40 performing
            members..
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 2 :{" "}
            </span>{" "}
            The music must be submitted in mp3 format to the organizer 1 hour
            before the event begins.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 3 :{" "}
            </span>{" "}
            Performance duration must lie between 8-15 minutes.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 4 :{" "}
            </span>{" "}
            Props can also be used for the Performance like hats,sticks,etc. But
            the use of hazardous props are not allowed.Eg: fire,knifes,etc.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 5 :{" "}
            </span>{" "}
            Performance may or may not be theme based.
          </p>
        </div>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            PRIZE MONEY :{" "}
          </span>{" "}
          Rs 35,000.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            VENUE:{" "}
          </span>{" "}
          Main stage.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            Contact :{" "}
          </span>{" "}
          Rohan Kumar(8757428586) , Rishita(6302541684)
        </p>
      </>
    ),
  },

  {
    id: "foot loose",
    eventname: "FOOT LOOSE",
    category: "Dance",
    description: `"GREAT DANCERS ARE NOT GREAT BECAUSE OF THEIR TECHNIQUE,IT'S BECAUSE OF THEIR PASSION." It doesn't matter if you are a jazz dancer or a "Chak de Phatte" bhangra specialist.Put your dancing shoes on and compete in the solo dance competiton to prove that you are a connoisseur when it comes to grooving to beats.`,
    image: "/dance1.webp",
    rules: (
      <>
        <div
          title="Rules of Foot Loose"
          className="space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 1 :{" "}
            </span>{" "}
            The competition will take place in two rounds the prelims and the
            finals.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 2 :{" "}
            </span>{" "}
            The music to be used must be submitted to the organiser in mp3
            format at least one hour before the event.
          </p>
        </div>

        <div
          title="Details of Prelims"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">PRELIMS</span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 1 :{" "}
            </span>
            The participants must showcase a demo of their performance, for the
            final round.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 2 :{" "}
            </span>{" "}
            The duration of performance should be 1 to 1.5 minutes.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 3 :{" "}
            </span>{" "}
            Props are allowed.
          </p>
        </div>

        <div
          title="Details of Finals"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">FINALS</span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 1 :{" "}
            </span>
            The performance time for each participant is 2 to 3 minutes.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 2 :{" "}
            </span>{" "}
            Songs should be a mixture of a minimum of 2 songs
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 3 :{" "}
            </span>
            The creative use of props is allowed in this round and it does fetch
            points in this round.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 4 :{" "}
            </span>
            Vulgarity of any form will not be allowed in the competition and can
            lead to immediate disqualification.
          </p>
        </div>

        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            PRIZE MONEY :{" "}
          </span>{" "}
          Rs 8,000.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            VENUE:{" "}
          </span>{" "}
          Open Air Theatre.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            Contact :{" "}
          </span>{" "}
          Manish Kumar(9523120247) , SUZY(8084365518)
        </p>
      </>
    ),
  },

  {
    id: "battle of dance",
    eventname: "BATTLE OF DANCE",
    category: "FLAGSHIP EVENTS",
    description: `To dance is to be out of your self.If you think you have that "Dance ka Keeda" in you, our stage awaits your "Dhamakedaar Entry". Be it classical , contemporary,hip hop, or the like; if you think you can dance anytime,anywhere , in any dance form show us what you've got and set the stage ablaze with your dance moves in one of the most exciting and fun filled events of culfest 25.`,
    image: "/dance1.webp",
    rules: (
      <>
        <div
          title="Details of Prelims"
          className="space-y-2  rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">PRELIMS</span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 1 :{" "}
            </span>
            Performance time: 4 to 6 minutes (as per music track
            length).
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 2 :{" "}
            </span>
            Teams must perform using more than 2 music tracks.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 3 :{" "}
            </span>
            Teams are expected to showcase diversity in style,
            formation, transitions, and teamwork.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 4 :{" "}
            </span>
            This performance cannot be repeated in later rounds.
          </p>
        </div>

        <div
          title="Details of Finals"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">FINALS</span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 1 :{" "}
            </span>
            Top 4 teams from the Pre-Finals qualify for the Battles.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 2 :{" "}
            </span>
            Team matchups will be decided by a random draw as follows:
            <div className="pl-5">
              <p>Battle 1: Team 1 vs. Team 2</p>
              <p>Battle 2: Team 3 vs. Team 4</p>
            </div>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 3 :{" "}
            </span>
            Final Battle:
            Winner of Battle 1 vs. Winner of Battle 2.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 4 :{" "}
            </span>
            3rd Place Battle: Runner-up of Battle 1 vs. Runner-up of Battle 2.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 5 :{" "}
            </span>
            Music tracks for the battles will be provided on the venue by the organizers.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 6 :{" "}
            </span>
            Same track will be played for both teams in a particular battle.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 7 :{" "}
            </span>
            Each battle consists of 5 rounds.
            <div className="pl-5">
              Maximum 4 members per team can compete in each round.
            </div>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 8 :{" "}
            </span>
            Time limit per round:
            <div className="pl-5">
              <p>1 minute per team (music on to music off)</p>
              <p>Total battle duration = 1 min × 2 teams × 5 rounds = 10 minutes</p>
            </div>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 9 :{" "}
            </span>
            In case of a tie, an extra round may be provided.
          </p>
        </div>

        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            PRIZE MONEY :{" "}
          </span>{" "}
          Rs 8,000.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            VENUE:{" "}
          </span>{" "}
          Open Air Theatre.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            Contact :{" "}
          </span>{" "}
          <div className="pl-5">
            Priyanshu Dev(7307834859) <br /> Avani Gupta(9234642470)
          </div>
        </p>
      </>
    ),
  },

  {
    id: "poshak",
    eventname: "POSHAK",
    category: "Fine Arts",
    description: `Unleash your inner designer, where the only limit is your
              imagination. In this high-stakes couture challenge, the
              theme remains a mystery until the clock starts ticking.
              Armed with nothing but paper, craft supplies, and raw
              creativity, teams must conceptualize and construct a
              masterpiece on the spot. It's not just about fashion; it's about
              precision, speed, and the art of the unexpected.`,
    image: "",
    rules: (
      <>
        <div
          title="Rules of Poshak"
          className="space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              TEAM :{" "}
            </span>
            <div className="pl-5">
              Each team must consist of four members. One member must act as the model who will wear the final creation, while the remaining members will serve as designers.
            </div>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              REGISTRATION :{" "}
            </span>
            <div className="pl-5">
              Pre-register online before the event.
            </div>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              MATERIALS :{" "}
            </span>
            <div className="pl-5">
              Only materials provided by Team FACES, such as newspapers, chart paper, tape, glue, cutters, and similar supplies, may be used. <br />
              No pre-made accessories or pre-folded paper elements are allowed. <br />
              Participants are strictly forbidden from using any outside decorative materials.
            </div>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              THEME :{" "}
            </span>
            wil be given on the spot.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              TIME DURATION :{" "}
            </span>
            2 hours.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              JUDGING :{" "}
            </span>
            <div className="pl-5">
              Entries will be evaluated based on creativity and originality. <br />
              Interpretation of the theme will be assessed. <br />
              Presentation and explanation of the design will also be considered.
            </div>
          </p>
        </div>

        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            PRIZE MONEY :{" "}
          </span>{" "}
          Rs 15,000.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            VENUE:{" "}
          </span>{" "}
          Lecture Hall Complex.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            For any Query , Contact :{" "}
          </span>{" "}
          <div className="pl-5">
            Shaily (9234268855), Sachin (7633822736), Swetha (9866649939)
          </div>
        </p>
      </>
    ),
  },

  {
    id: "3d scapes",
    eventname: "3D SCAPES",
    category: "Fine Arts",
    description: `Why just see art when you can feel it? Team FACES invites
                  you to 3D~Scapes, an event that breaks the boundaries of
                  traditional painting. Move beyond smooth brushstrokes and
                  dive into the world of relief and dimension. Participants will
                  use unconventional tools and mediums to create a
                  masterpiece that leaps off the canvas. Whether it's the
                  ruggedness of mountains or the delicate ripples of water,
                  show us how you bring depth to your imagination.`,
    image: "",
    rules: (
      <>
        <div
          title="Rules of 3D Scapes"
          className="space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              TEAM :{" "}
            </span>
            Teams of two individual in pair.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              REGISTRATION :{" "}
            </span>
            Pre-register online before the event.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              MATERIALS :{" "}
            </span>
            <div className="pl-5">
              All materials will be provided by Team FACES. <br />
              It is mandatory for participants to create a raised texture in their artwork.
            </div>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              THEME :{" "}
            </span>
            The theme will be revealed five minutes before the clock starts. Participants must interpret the theme through a three-dimensional perspective.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              TIME DURATION :{" "}
            </span>
            2 hours.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              JUDGING :{" "}
            </span>
            <div className="pl-5">
              Entries will be judged based on structural integrity. <br />
              Tactile creativity will be evaluated, focusing on innovation in creating depth.<br />
              Thematic execution will be assessed on how effectively the three-dimensional elements represent the spot theme.
            </div>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            Use of marker is prohibited.
          </p>
        </div>

        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            PRIZE MONEY :{" "}
          </span>{" "}
          Rs 10,000.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            VENUE:{" "}
          </span>{" "}
          Lecture Hall Complex.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            For any Query , Contact :{" "}
          </span>{" "}
          <div className="pl-5">
            Varnika Bharalia (6396333537)<br /> Aditya Raj Tewary (9142143387),<br /> Yaswitha (6302150133)
          </div>
        </p>
      </>
    ),
  },

  {
    id: "frame by frame",
    eventname: "FRAME BY FRAME",
    category: "Photography",
    description: `Frame by Frame invites participants to showcase their
                  storytelling and filmmaking skills by creating a one-
                  minute short film on an open theme. Participants must
                  craft an original narrative using live-action footage shot by
                  themselves. This event emphasizes creativity,
                  cinematography, editing, sound design, and teamwork.`,
    image: "/framebyframe.jpg",
    rules: (
      <>
        <div
          title="Details"
          className="space-y-2  rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              PARTICIPANTS :{" "}
            </span>
            Participation is open to teams consisting of three to five members.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              THEME :{" "}
            </span>
            The theme is open, and participants are free to choose any concept or story.
          </p>
        </div>

        <div
          title="Format"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">FORMAT : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              FILM CREATION :{" "}
            </span>
            Teams must create an original one-minute short film shot after January 2026.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              SUBMISSION :{" "}
            </span>
            Completed short films must be submitted through a drive link to phocus_nit@nitjsr.ac.in.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              SCREENING AND JUDGING :{" "}
            </span>
            All submitted films will be screened and evaluated by a panel of judges.
          </p>
        </div>

        <div
          title="Technical Guidelines"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">
              TECHNICAL GUIDELINES :{" "}
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            The use of AI tools is strictly prohibited. This includes AI-generated visuals, audio, voice, script, or editing.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            Any camera device may be used, including smartphones, DSLR cameras, or mirrorless cameras.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            Teams must retain and present raw footage if required for verification.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            Films must be original and must not violate copyright or include copyrighted music or footage.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            The duration of the film must not exceed one minute, with a margin of plus or minus five seconds including titles.
          </p>
        </div>

        <div
          title="Judging criteria"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">JUDGING CRITERIA : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              Evaluation will be based on storytelling and creativity, which carries a weightage of 40 percent.
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              Cinematography and visual impact will account for 25 percent.
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              Editing and pace will be evaluated for 20 percent.
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              Sound design will contribute 15 percent to the final score.
            </span>
          </p>
        </div>

        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            PRIZE MONEY :{" "}
          </span>{" "}
          Rs 14,000.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            Contact :{" "}
          </span>{" "}
          <div className="pl-5">
            Rimo Roy (7763930044) <br /> Ayush (9628738923)
          </div>
        </p>
      </>
    ),
  },

  {
    id: "echoes of emotion",
    eventname: "ECHOES OF EMOTION",
    category: "Photography",
    description: "Echoes of Emotion is a creative photography event designed to capture the raw and authentic expressions of human emotions during the vibrant atmosphere of CULFEST 26. Participants are required to closely observe their surroundings and document moments that truly resonate with seven specified emotions. The event focuses on storytelling, emotional depth, and photographic aesthetics.",
    image: "/candid.webp",
    rules: (
      <>
        <div
          title="Details"
          className="space-y-2  rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              PARTICIPANTS :{" "}
            </span>
            This is an individual participation event. Each participant is allowed only one submission.
          </p>
        </div>

        <div
          title="Format"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              EVENT DURATION :{" "}
            </span>{" "}
            All photographs must be captured strictly during the official schedule of CULFEST 26.
          </p>
        </div>

        <div
          title="Format"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">FORMAT : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              PHOTOGRAPHY CHALLENGE :{" "}
            </span>
            <div className="pl-5">
              Participants must capture exactly seven photographs, with each photograph representing a distinct emotion. All photographs must be taken strictly during the official timeline of CULFEST 26 and compiled into a single PDF file for submission. <br />
              The seven emotions to be captured are Happiness, Sadness, Anger, Surprise, Calm or Serenity, Fear, and Disgust.
            </div>
          </p>
          <br />
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              SUBMISSION GUIDELINES :{" "}
            </span>
            <div className="pl-5">
              Exactly seven photographs must be submitted. <br />
              All photographs must be combined into a single PDF file. <br />
              Each image must be clearly labeled with the emotion it represents. <br />
              All photographs must be original and clicked only during CULFEST 26. <br />
              Minor color correction is allowed, but heavy editing or manipulation is strictly prohibited. <br />
              Image metadata may be verified by the organizing team. <br />
              Late or incomplete submissions will not be considered.
            </div>
          </p>
        </div>

        <div
          title="Technical Guidelines"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">
              TECHNICAL GUIDELINES :{" "}
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              1.EQUIPMENT :{" "}
            </span>{" "}
            Any camera (DSLR, smartphone, mirrorless, etc.) is allowed.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              2.EDITING RULES :{" "}
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            - Basic adjustments like cropping, exposure, color correction, and
            masking are permitted.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            - AI-generated content and heavy manipulations are strictly
            prohibited.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              3.METADATA REQUIREMENTS :{" "}
            </span>
            RAW files with metadata must be submitted to ensure authenticity.
          </p>
        </div>

        <div
          title="Judging criteria"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">JUDGING CRITERIA : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              Judging will be based on the accuracy and clarity of the emotion portrayed.
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              Creativity, originality, and concept will be evaluated.
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              Composition, lighting, and overall technical quality will be considered.
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              Emotional impact and storytelling ability will be assessed.
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              Adherence to rules and submission guidelines is mandatory.
            </span>
          </p>
        </div>
        <div
          title="RULES"
          className="space-y-2  rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 1:{" "}
            </span>{" "}
            Participants must carry their own camera equipment or smartphones.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 2 :{" "}
            </span>
            Previously clicked or downloaded images are not allowed.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 3 :{" "}
            </span>{" "}
            Any form of plagiarism or misrepresentation will result in immediate disqualification.
          </p>
        </div>

        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            PRIZE MONEY :{" "}
          </span>{" "}
          Rs 9,000.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            Contact :{" "}
          </span>{" "}
          <div className="pl-5">
            Uday Kesarwani (8470948486) <br /> Siddharth Roy (6200552175)
          </div>
        </p>
      </>
    ),
  },

  {
    id: "adventure",
    eventname: "ADVENTURE",
    category: "Photography",
    description:
      "Battle of the Bands is a competitive musical showdown where registered bands perform live on stage. The event aims to celebrate talent, creativity, teamwork, and stage presence.",
    image: "/candid.webp",
    rules: (
      <>
        <div
          title="Rules of Adventure"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          className="space-y-2 rounded-md border-2 p-4 transition-all duration-300"
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 1 :{" "}
            </span>{" "}
            All content must be appropriate and comply with fest guidelines.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 2 :{" "}
            </span>{" "}
            Plagiarism or reuse of existing advertisements is strictly prohibited.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
              RULE 3 :{" "}
            </span>{" "}
            Late or incomplete submissions will not be considered.
          </p>
        </div>

        <div
          title="Technical Guidelines"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">
              TECHNICAL GUIDELINES :{" "}
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              The maximum video length must be sixty seconds.
            </span>{" "}
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              The language of the video should be either Hindi or English.
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            Any camera or recording device may be used, including smartphones, DSLR cameras, or mirrorless cameras.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            All editing tools and visual or sound effects are permitted.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              The content must be original and created strictly during the event timeline.
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              The poster must appear clearly at the end of the video and should accurately reflect the advertisement concept.
            </span>
          </p>
        </div>

        <div
          title="Judging criteria"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">JUDGING CRITERIA : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              Creativity and originality will be evaluated.
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              Interpretation of the theme will be considered.
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              Marketing impact and storytelling ability will be assessed.
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              Technical quality, including video, sound, and editing, will be judged.
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              Overall presentation and audience appeal will also be taken into account.
            </span>
          </p>
        </div>

        <p
          className=" mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra " style={{ letterSpacing: "1px" }}>
            PRIZE MONEY :{" "}
          </span>{" "}
          Rs 12,000
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
            VENUE :{" "}
          </span>{" "}
          Open Air Theatre.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "1px" }}>
            CONTACT :{" "}
          </span>{" "}
          <div className="pl-5">
            Avani Gupta (9234642470) <br />
            Ansh (7632904999)
          </div>
        </p>
      </>
    ),
  },

  {
    id: "panache",
    eventname: "PANACHE",
    category: "Fashion",
    description: "Panache is a high-energy fashion showcase where creativity, confidence, and storytelling take center stage. When the lights hit the ramp and the music sets the rhythm, participants transform the stage with powerful walks, striking outfits, and cohesive themes. This event celebrates fashion as an art form—blending design, attitude, and performance into one unforgettable spectacle.",
    image: "/invicta2.png",
    rules: (
      <>
        <div
          title="RULES"
          className="space-y-2  rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 1:{" "}
            </span>{" "}
            Each team must consist of 10 to 18 participants.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 2 :{" "}
            </span>
            Teams may choose any theme, but relevance and consistency with the theme is mandatory.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 3 :{" "}
            </span>{" "}
            Participants must bring their own costumes, props, and accessories.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 4 :{" "}
            </span>{" "}
            Judging will focus on originality, confidence, walking style, attitude, theme portrayal, and music synchronization.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 5 :{" "}
            </span>{" "}
            All team members must be dressed according to the defined theme.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 6 :{" "}
            </span>
            Offensive or unsafe props or actions are strictly prohibited.
          </p>
        </div>

        <div
          title="ELIGIBILITY"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">ELIGIBILITY : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            This is a team event open to groups of 10–18 participants.<br />
            Teams must ensure consistency in theme, attire, and presentation.
          </p>
        </div>

        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            VENUE :{" "}
          </span>{" "}
          MAIN STAGE
        </p>

        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            PRIZE MONEY :{" "}
          </span>{" "}
          Rs 38,000.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            For any Query , Contact :{" "}
          </span>{" "}
          <div className="pl-5">
            Srijan Swapnil (9162780885) <br /> Kanishka (8579098733)
          </div>
        </p>
      </>
    ),
  },

  {
    id: "mr and miss culfest",
    eventname: "MR AND MISS CULFEST",
    category: "Fashion",
    description: "Mr. & Miss Culfest is a personality-driven fashion event where confidence meets elegance. Participants express their individuality through powerful ramp walks, creative self-introductions, and dynamic on-stage coordination. The event celebrates style, communication, and stage presence, transforming the ramp into a platform of charisma, talent, and teamwork.",
    image: "/invicta3.jpg",
    rules: (
      <>
        <div
          title="ELIGIBILITY"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">ELIGIBILITY : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            The event is open to individual male and female participants registered for Culfest.
          </p>
        </div>

        <div
          title="ELIGIBILITY"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">ELIGIBILITY : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            The event is open to individual male and female participants registered for Culfest.
          </p>
        </div>

        <div
          title="RULES"
          className="space-y-2  rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 1:{" "}
            </span>{" "}
            Each participant must perform a ramp walk and deliver a creative self-introduction in Round 1.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 2 :{" "}
            </span>
            The self-introduction should include the participant's name, talents, interests, ambitions, or unique qualities.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 3 :{" "}
            </span>{" "}
            In Round 2, participants will perform in pairs with coordinated movement or interaction.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 4 :{" "}
            </span>{" "}
            Judges may ask one to two situational or general questions to either or both participants.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 5 :{" "}
            </span>{" "}
            Female participants must wear cocktail dresses, while male participants must wear western suits.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 6 :{" "}
            </span>{" "}
            Costumes must be decent, elegant, and culturally appropriate.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 7 :{" "}
            </span>{" "}
            Vulgar, obscene, or offensive outfits or actions will lead to immediate disqualification.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 8 :{" "}
            </span>{" "}
            Props are allowed only if they are safe, non-hazardous, and pre-approved by the organizers.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 9 :{" "}
            </span>{" "}
            Time limits for each round must be strictly followed.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              RULE 10 :{" "}
            </span>{" "}
            The decisions of the judges will be final and binding.
          </p>
        </div>

        <div
          title="Judging criteria"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">JUDGING CRITERIA : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              Judging will be based on confidence, clarity of speech, spontaneity, personality, and stage presence.
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              Coordination during the Couple Round will also be evaluated.
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              Overall presentation will be taken into account.
            </span>
          </p>
        </div>

        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            VENUE :{" "}
          </span>
          OPEN AIR THEATRE
        </p>

        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            PRIZE MONEY :{" "}
          </span>{" "}
          Rs 17,000.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            Contact :{" "}
          </span>{" "}
          <div className="pl-5">
            Kartik Tigga (9508517345) <br /> Srijan Swapnil (9162780885)
          </div>
        </p>
      </>
    ),
  },

  {
    id: "mun",
    eventname: "MUN",
    category: "Literary",
    description: `"This is a light yet structured Model United Nations simulation
                where delegates represent allotted countries, debate
                predefined agendas, engage in diplomatic negotiations, and
                draft practical solutions. The event emphasizes clarity of
                thought, persuasive speaking, adherence to procedure, and
                realistic resolution-building."`,
    image: "/journalism.jpg",
    rules: (
      <>
        <div
          title="Participation"
          className="space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">Participation</span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              This is an individual event. <br />
              Committees and agendas will be announced prior to the conference. <br />
              Country allocations are done by the organizers.
            </span>
          </p>
        </div>

        <div
          title="speaking guidelines"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              SPEAKING GUIDELINES :{" "}
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            Opening speeches should be 60–90 seconds. GSL speeches are limited to 60 seconds. Moderated caucus speeches are limited to 30 seconds per speaker. A maximum of one Point of Information (POI) is allowed per speech.
          </p>

        </div>

        <div
          title="Resolution Rules"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">Resolution Rules</span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              Resolutions must clearly define the issue, proposed actions, and implementation mechanisms. They may be authored individually or jointly and require a simple majority to pass.
            </span>
          </p>
        </div>

        <div
          title="Session structure and point distribution"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">SESSION STRUCTURE AND POINT DISTRIBUTION </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              The session begins with Roll Call, carrying 5 points, where delegates respond with "Present" or "Present and Voting", "and attendance and preparedness are recorded".
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              The General Speaker's List (GSL) carries 25 points. Delegates deliver structured speeches presenting their country's stance on the agenda, with emphasis on clarity, relevance, and policy articulation.
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              Moderated and Unmoderated Caucuses together carry 25 points. Moderated caucuses involve short, focused speeches on specific sub-topics, while unmoderated caucuses allow informal negotiations, bloc formation, and exchange of ideas. Delegates are judged on diplomacy, engagement, and negotiation skills.
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              Working Papers and Resolution Drafting carry 25 points. Delegates draft solutions addressing the agenda individually or collaboratively, and are evaluated on practicality, originality, and clarity of implementation.
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              The Voting Procedure carries 10 points. Delegates vote on proposed resolutions following standard MUN procedure, and a simple majority is required for a resolution to pass.
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              Closing Remarks carry 10 points. Delegates deliver final speeches summarizing their stance, contributions, and proposed solutions.
            </span>
          </p>
        </div>

        <div
          title="JUDGEMENT CRITERIA"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">JUDGEMENT CRITERIA : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            Judging is based on content quality and relevance, public speaking and clarity, diplomacy and negotiation skills, teamwork, proper use of MUN procedure, and the practicality and originality of proposed solutions, for a total of 100 points.
          </p>
        </div>

        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            PRIZE MONEY :{" "}
          </span>{" "}
          Rs 14,000.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            VENUE:{" "}
          </span>{" "}
          Diamond JUbilee Lecture Hall Complex.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            Contact :{" "}
          </span>{" "}
          <div className="pl-5">
            Sweksha Misra (7808265778) <br /> Sankarshan Rastogi (8081252928)
          </div>
        </p>
      </>
    ),
  },

  {
    id: "petty debate",
    eventname: "PETTY DEBATE",
    category: "Literary",
    description:
      `"
      Petty Debate is a light-hearted and fast-paced debating
      event that celebrates the art of arguing over trivial,
      exaggerated, and everyday topics. Unlike conventional
      debates that focus on serious policy or social reform,
      this event encourages participants to think on their feet,
      confidently exaggerate, and defend absurd stances with
      humor, flair, and basic logic.
      "`,
    image: "",
    rules: (
      <>
        <div
          title="Participation Guidelines"
          className="space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">Participation Guidelines</span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            Petty Debate is an individual event open to all registered participants of the Literary and Debating Society. Debate topics will be revealed on the spot or five minutes prior to the round. Participants must argue either for or against the assigned motion. Limited preparation time is provided to promote spontaneity and quick thinking.
          </p>
        </div>

        <div
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">FORMAT AND ROUNDS:</span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            The event will consist of time-bound rounds, depending on the number of participants. Each speaker will be allotted time for an opening argument, a rebuttal, and an optional closing statement, subject to the moderator's discretion. Strict adherence to time limits is mandatory.
          </p>
        </div>

        <div
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">Rules :</span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            1. Arguments must remain light-hearted and humorous at all times. <br />
            2. The use of offensive, discriminatory, or explicit language is strictly prohibited. <br />
            3. Personal attacks on individuals or groups are not allowed. <br />
            4. While exaggeration is encouraged, arguments must maintain a basic logical structure. <br />
            5. Participants must respect the moderator's decisions, and exceeding time limits may result in point deductions.
          </p>
        </div>

        <div
          title="JUDGEMENT CRITERIA"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">JUDGEMENT CRITERIA : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            Judging will be based on creativity and originality of arguments, wit and humor, audience engagement, clarity and structure, quality of rebuttals, and effective time management.
          </p>
        </div>

        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            PRIZE MONEY :{" "}
          </span>{" "}
          Rs 8,000.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            VENUE:{" "}
          </span>{" "}
          Diamond Jubilee Lecture Hall Complex.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            {" "}
            Contact :{" "}
          </span>{" "}
          <div className="pl-5">
            Avani Gupta (9234642470)
          </div>
        </p>
      </>
    ),
  },

  {
    id: "plot paradox",
    eventname: "PLOT PARADOX",
    category: "Literary",
    description: "Plot Paradox is a creative speaking event that challenges participants to rethink literature through imagination and genre transformation. Contestants are given a literary work on the spot and must rewrite its ending in a completely different genre, blending originality with logical storytelling. The event emphasizes clarity, creativity, and quick thinking, while encouraging participants to defend their narrative choices during an interactive question-and-answer round.",
    image: "/peopleparley.jpg",
    rules: (
      <>
        <div
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">RULES :</span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            1. Participation is on a solo basis. <br />
            2. Each participant receives the story at the venue and is given a 5-minute preparation window. <br />
            3. Only one speaker presents at a time. <br />
            4. The event begins with the assignment of a topic or story, followed by a 5-minute preparation period. <br />
            5. The participant then presents the rewritten ending for 120 seconds. <br />
            6. This is followed by a 120-second question-and-answer session, with a maximum of two questions from the audience.<br />
            7. Questions may focus on characters, plot decisions, or genre consistency. <br />
          </p>
        </div>

        <div
          title="JUDGEMENT CRITERIA"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">JUDGEMENT CRITERIA : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            Judging is based on clarity of expression, vivid descriptions, creative genre transformation, and effective time management. Extra points are awarded for speeches lasting between 60 and 120 seconds.
          </p>
        </div>

        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            PRIZE MONEY :{" "}
          </span>{" "}
          Rs 8,000.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            VENUE:{" "}
          </span>{" "}
          Diamond Jubilee Lecture Hall Complex.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            For any Query, Contact :{" "}
          </span>{" "}
          <div className="pl-5">
            Aameya Devansh (9234102388) <br /> Sara Singh (9555361043)
          </div>
        </p>
      </>
    ),
  },

  {
    id: "culfest idol",
    eventname: "CULFEST IDOL",
    category: "Music",
    description: `"
                CULFEST IDOL is a premier solo singing competition designed
                to showcase exceptional vocal talent. Participants perform
                individually within a defined time limit using only a musical
                backtrack. The event focuses on vocal quality, musicality,
                expression, and stage presence.
    "`,
    image: "/music1.jpg",
    rules: (
      <>
        <div
          title="Rules"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">RULES : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            1. Only solo performances are permitted.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            2. Participants must perform using a pre-recorded karaoke backtrack.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            3. Live instruments, beatboxing, or accompanying performers are not allowed.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            4. The backtrack must be submitted in advance in either .mp3 or .wav format.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            5. Song choice is open but must be appropriate for a public cultural event.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            6. Exceeding the prescribed time limit may result in point deduction or disqualification.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            7. The use of offensive language or inappropriate content is strictly prohibited.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            8. Only Hindi and English songs are allowed.
          </p>
        </div>

        <div
          title="time limit"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">TIME LIMIT : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            Each participant is allotted a total stage time of 5-6 minutes, including setup. The maximum singing duration is 5 minutes.
          </p>
        </div>

        <div
          title="judgement criteria"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">JUDGEMENT CRITERIA : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            Participants will be judged on vocal quality and pitch accuracy, rhythm and timing, expression and interpretation, and overall stage presence and confidence.
          </p>
        </div>

        <div
          title="elimination and rounds"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">ELIMINATION AND ROUNDS : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            The competition may include a preliminary round followed by a final round, depending on the number of entries. Top performers from the preliminary round will qualify for the finals.
          </p>
        </div>

        <div
          title="technical requirements"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">TECHNICAL REQUIREMENTS : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            Participants must bring their own backtrack and keep a backup copy available on their phone. A standard stage microphone and sound system will be provided by the organizers.
          </p>
        </div>

        <div
          title="awards"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">AWARDS : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            Awards will be given for Winner, Runner-up, and Special Mention.
          </p>
        </div>


        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            PRIZE MONEY :{" "}
          </span>{" "}
          Rs 20,000.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            VENUE :{" "}
          </span>{" "}
          Open air theatre
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            Contact :{" "}
          </span>{" "}
          <div className="pl-5">
            Arsh Mishra (8171349941) <br /> Anshul (8602677215)
          </div>
        </p>
      </>
    ),
  },

  {
    id: "symphonic arena",
    eventname: "SYMPHONIC ARENA",
    category: "Music",
    description: `Symphonic Arena is an instrumental performance event under
                  CULFEST, dedicated exclusively to live instrumental music.
                  Participants present live performances without vocals or
                  prerecorded elements, highlighting musical technique,
                  creativity, and expressive performance.`,
    image: "/music2.jpg",
    rules: (
      <>
        <div
          title="eligibility"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">ELIGIBILITY : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            The competition is open to all registered participants of CULFEST.
          </p>
        </div>

        <div
          title="Rules"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">RULES : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            1. Participants may perform solo or in a group of up to three members.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            2. Only instrumental performances are allowed, and vocals are strictly prohibited.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            3. Backtracks, prerecorded audio, samples, or external sound sources are not permitted, and all sound must be produced live on stage.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            4. Live looping is allowed.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            5. Violation of time limits may lead to penalties or disqualification.
          </p>
        </div>

        <div
          title="time limit"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-4xl">TIME LIMIT : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            The maximum performance duration is 10 minutes, including setup and sound check.
          </p>
        </div>

        <div
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-3xl">JUDGING CRITERIA : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            Judging will be based on technical proficiency and control, musicality, composition and arrangement, synchronizationnd coordination for group performances, stage presence and audience engagement, originality, and overall impact.
          </p>
        </div>

        <div
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-3xl">ELIMINATION AND ROUNDS : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            Preliminary and final rounds may be conducted depending on the number of entries. The judges’ decision will be final.
          </p>
        </div>

        <div
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-3xl">TECHNICAL REQUIREMENT : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            Standard microphones and basic audio support will be provided by the organizers. Participants must bring their own instruments and all required accessories. Any special technical requirements must be communicated to the organizers in advance.
          </p>
        </div>

        <div
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-3xl">AWARDS : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            Awards will be presented for Winner, Runner-up, and Special Mention.
          </p>
        </div>

        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            PRIZE MONEY :{" "}
          </span>{" "}
          Rs 25,000.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            VENUE :{" "}
          </span>{" "}
          Open air theatre
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            Contact :{" "}
          </span>{" "}
          <div className="pl-5">
            Pratyush Singh (8789073003) <br /> Supriyo Dhani (7384641664)
          </div>
        </p>
      </>
    ),
  },

  {
    id: "the infinity quest",
    eventname: "THE INFINITY QUEST",
    category: "Informals",
    description: `"
                The Infinity Quest is a two-round, team-based event
                themed around the Superhero Multiverse. The event
                combines a visual quiz and a campus-wide treasure hunt,
                testing participants' pop-culture knowledge, observation
                skills, teamwork, and problem-solving abilities.
    "`,
    image: "",
    rules: (
      <>
        <div
          title="Participation guidelines"
          className="space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-3xl">PARTICIPATION GUIDELINES : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              The event is open to all students of the institute. Participants must register in teams of 3 to 5 members. Cross-year teams are allowed unless stated otherwise by the organizers. Solo participation is not permitted, and once registered, team members cannot be changed.
            </span>
          </p>
        </div>

        <div
          title="event structure"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-3xl">EVENT STRUCTURE : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              Round 1 - Superhero Shadow Quiz (Eliminator Round)
              <div className="pl-5">
                1. Shadow silhouettes of superheroes will be displayed on screen. <br />
                2. Each question may include one or two hints. <br />
                3. Teams must identify the superhero within the allotted time. <br />
                4. Answers must be submitted as instructed during the event. <br />
                5. Scoring is based on accuracy, and top teams will qualify for the Final Round. <br />
                6. The number of qualifying teams will be decided by the organizers.
              </div>
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              Round 2 -  Infinity Stone Treasure Hunt (Final Round)
              <div className="pl-5">
                1. Qualified teams participate in a campus-wide treasure hunt. <br />
                2. Infinity Stones will be hidden at various locations across campus. <br />
                3. Teams receive clues and hints to locate each stone and must follow the sequence of clues provided. <br />
                4. The objective is to collect all required Infinity Stones in the shortest possible time. <br />
                5. The team that completes the hunt first, while following all rules, will be declared the winner. <br />
              </div>
            </span>
          </p>
        </div>

        <div
          title="Rules and regulation"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-3xl">RULES AND REGULATIONS : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              Participants must carry their college ID cards.
              <div className="pl-5">
                1. Teams must follow the instructions of volunteers and coordinators at all times. <br />
                2. Any form of misconduct, cheating, or indiscipline will lead to immediate disqualification. <br />
                3. Damage to college property will result in disqualification and possible disciplinary action. <br />
                4. Round-Specific Rules <br />
                5. Use of mobile phones is not allowed in Round specified. <br />
                6. In Round 2, mobile phones may only be used when permitted by organizers. <br />
                7. Teams must not run inside academic buildings. <br />
                8. Clues, props, or stones must not be tampered with or removed from designated areas. <br />
                9. Teams must complete the hunt only through official clues; shortcuts are not allowed.
              </div>
            </span>
          </p>
        </div>

        <div
          title="scoring and qualification"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-3xl">SCORING AND QUALIFICATION : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              1. Round 1 scores determine qualification for Round 2. <br />
              2. Round 2 is evaluated based on:
              <div className="pl-5">
                Completion of the treasure hunt<br />
                Time taken
              </div>
              3. Adherence to rules <br />
              4. In case of a tie, the decision of the event coordinators will be final and binding.
            </span>
          </p>
        </div>

        <div
          title="organiser's rigtht"
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-3xl">ORGANISER'S RIGHTS : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              The organizers reserve the right to modify rules, rounds, or event flow if required. All decisions made by the organizing team and PnD committee will be final.
            </span>
          </p>
        </div>

        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            PRIZE MONEY :{" "}
          </span>{" "}
          Rs 20,000.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            VENUE:{" "}
          </span>{" "}

        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            For any Query , Contact :{" "}
          </span>{" "}
          Prachi Priyadarshini (9142961340) <br /> Shrishti (8797480013)
        </p>
      </>
    ),
  },

  {
    id: "multiverse mayhem",
    eventname: "MULTIVERSE MAYHEM",
    category: "Informals",
    description: `"
                Multiverse Mayhem is a fun-filled informal event designed to
                test participants' observation skills, communication ability,
                creativity, and acting prowess. Inspired by popular
                superheroes, movies, and fictional universes, the event
                features multiple entertaining rounds that are both
                challenging and humorous.
    "`,
    image: "",
    rules: (
      <>
        <div
          className="space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-3xl">PARTICIPATION GUIDELINES : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            1. Team-based event
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            2. Team size as per organizer instructions
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            3. Open to all registered participants
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            4. Participants must be present for all rounds to remain eligible
          </p>
        </div>

        <div
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-3xl">EVENT FORMAT AND ROUNDS : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            Round 1 - Two Truths & a Lie (Elimination Round)
            <div className="pl-5">
              1. A superhero description with two true statements and one false statement will be shown. <br />
              2. Teams must identify the correct superhero using the clues. <br />
              3. Accuracy and quick thinking are important. <br />
              4. Top 10-15 teams will qualify for the next round.
            </div>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            Round 2 - Chinese Whisper
            <div className="pl-5">
              1. Teams compete in pairs. <br />
              2. One member wears headphones with loud music while the other whispers a given phrase. <br />
              3. The headphone-wearing member guesses the phrase aloud. <br />
              4. Scoring is based on accuracy.
            </div>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            Round 3 - Universe Swapping (Final Round)
            <div className="pl-5">
              1. Teams pick one character chit and one movie/universe chit. <br />
              2. Participants act out the character in the selected universe (e.g., Babu Rao in Endgame). <br />
              3. Judging is based on creativity, acting, entertainment, and overall performance. <br />
            </div>
          </p>
        </div>

        <div
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-3xl">RULES AND REGULATIONS : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            1. Participants must follow all instructions given by the coordinators.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            2. Use of offensive, inappropriate, or abusive language is strictly prohibited.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            3. Any form of misconduct may lead to immediate disqualification.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            4. Judges' and organizers' decisions are final and binding.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            5. Time limits must be strictly followed in all rounds.
          </p>
        </div>

        <div
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-3xl">
              JUDGING CRITERIA:{" "}
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            1. Accuracy and presence of mind
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            2. Communication and coordination
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            3. Creativity and originality
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            4. Acting skills and expressions
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            5. Audience engagement
          </p>
        </div>

        <div
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-3xl">
              CODE OF CONDUCT :{" "}
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            1. Participants are expected to maintain discipline and sportsmanship throughout the event.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            2. Any unfair means or disruptive behavior will result in disqualification.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            3. The organizing committee reserves the right to modify rules if necessary.
          </p>
        </div>

        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            PRIZE MONEY :{" "}
          </span>{" "}
          Rs 14,000.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            VENUE:{" "}
          </span>{" "}
          Campus.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            For any Query , Contact :{" "}
          </span>{" "}
          <div className="pl-5">
            Shristi Shreya (7320876807) <br /> Shubhangi (9708109306)
          </div>
        </p>
      </>
    ),
  },

  {
    id: "heroes on trial: a knives out mystery",
    eventname: "HEROES ON TRIAL: A KNIVES OUT MYSTERY",
    category: "Informals",
    description: `"
                Heroes on Trial is an engaging team-based informal event that
                blends observation, deduction, communication, and strategic
                thinking. Inspired by mystery and superhero universes,
                participants must uncover imposters and solve a thrilling
                murder mystery through logical reasoning and teamwork.
    "`,
    image: "",
    rules: (
      <>
        <div
          className="space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-3xl">PARTICIPATION GUIDELINES : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            1. Team-based event <br />
            2. Each team consists of 4 members <br />
            3. Open to all registered participants <br />
            4. Teams must participate in all rounds to remain eligible
          </p>
        </div>

        <div
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-3xl">EVENT FORMAT AND ROUNDS : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            Round 1 - Imposter Word Challenge (Elimination Round)
            <div className="pl-5">
              1. Played head-to-head between two teams: an Imposter Team and a Challenger Team.<br />
              2. In the Imposter Team, three members receive the same word, while one member receives a different word (the imposter).<br />
              3. Each member describes their assigned word one by one in rotation. <br />
              4. Each participant gets two chances to describe their word (two rotations). <br />
              5. After all descriptions, the Challenger Team gets 2 minutes to identify the imposter.<br />
              6. If the Challenger Team succeeds, they advance to Round 2; if not, the Imposter Team advances.
            </div>
            Round 2 - Murder Mystery (Final Round)
            <div className="pl-5">
              1. A legendary superhero has been murdered, and all suspects are superheroes.<br />
              2. Teams act as investigators to uncover the truth behind the crime. <br />
              3. Each team is given 100 tokens at the start of the round to purchase clues such as:
              <div className="pl-5">
                Autopsy report <br /> Crime scene layout <br /> Suspect interrogation reports <br /> Forensic findings
              </div>
              4. Each team initially receives a basic case description (who was murdered, where the body was found, and the condition of the body).
            </div>
          </p>
        </div>

        <div
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-3xl">TEAMS MUST DETERMINE : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            1. Who committed the murder <br />
            2. Why the murder was committed <br />
            3. How the murder was carried out <br />
            4. The team that solves the case using the least number of tokens wins. In case of a tie, the team that submits their report first will be declared the winner.
          </p>
        </div>

        <div
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-3xl">RULES AND REGULATIONS : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            1. Participants must follow all instructions given by coordinators.<br />
            2. Any form of cheating, misconduct, or misbehavior will lead to disqualification. <br />
            3. Use of offensive or inappropriate language is strictly prohibited. <br />
            4. Judges' and organizers' decisions are final and binding. <br />
            5. Time limits must be strictly followed in all rounds.
          </p>
        </div>

        <div
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-3xl">JUDGING CRITERIA : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            1. Observation and deduction skills <br />
            2. Logical reasoning and analysis <br />
            3. Teamwork and communication <br />
            4. Efficient use of tokens <br />
            5. Accuracy and completeness of the final solution
          </p>
        </div>

        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            PRIZE MONEY :{" "}
          </span>{" "}
          Rs 14,000.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            LOCATION:{" "}
          </span>{" "}

        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            Contact :{" "}
          </span>{" "}
          Anubhav Maheshwari (8303607708) <br /> Ankita Bhattacharjee (8252582486)
        </p>
      </>
    ),
  },

  {
    id: "blind and dumb: the couple challenge",
    eventname: "BLIND AND DUMB: THE COUPLE CHALLENGE",
    category: "Informals",
    description: `"
                Blind & Dumb - The Couple Challenge is a two-round
                informal couple event designed to test coordination,
                communication, creativity, patience, and trust between
                partners. The event combines expressive acting with a
                visually challenging task, creating a fun and entertaining
                experience for both participants and the audience. It
                emphasizes teamwork under unconventional constraints,
                encouraging couples to rely on non-verbal understanding,
                adaptability, and presence of mind while maintaining a light-
                hearted and inclusive atmosphere. The event provides a
                platform for participants to showcase chemistry,
                spontaneity, and cooperative skills through humorous
                situations and unexpected outcomes. Clear rules and
                structured judging ensure fairness, safety, and enjoyment
                for all participants.
    "`,
    image: "",
    rules: (
      <>
        <div
          className="space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-3xl">TEAM COMPOSITION : </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            1. Each team must consist of two members (a couple).
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            2. Teams should register prior to the start of the event.
          </p>
        </div>

        <div
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-3xl">
              Round 1 - Dumb Charades (ELIMINATION ROUND)
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            1. One partner acts as the  performer and the other as the guesser.<br />
            2. The performer is given a word, phrase, movie title, or situational prompt by the organizers and must convey it using only gestures, expressions, and body language.<br />
            3. The guessing partner must identify the correct answer within the allotted time.
          </p>

          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-3xl">
              Round 2 - Blindfold Makeup Challenge (FINAL ROUND)
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            1. One partner will be blindfolded and will have to apply makeup to
            the other partner.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            2. The makeup kit will be provided by the organizers.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            3.Time Limit: 5 minutes.
          </p>
        </div>

        <div
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
              JUDGING CRITERIA :{" "}
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            Teams are judged on coordination and teamwork, creativity and expressiveness, accuracy and clarity in the Dumb Charades round, presentation and effort in the Blind Makeup Challenge, overall performance, and adherence to rules.
          </p>
        </div>

        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            PRIZE MONEY :{" "}
          </span>{" "}
          Rs 18,000.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            VENUE:{" "}
          </span>{" "}
          OAT/Any LHC room.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            Contact :{" "}
          </span>{" "}
          Ankita Bhattacharjee (8252582486)
        </p>
      </>
    ),
  },

  {
    id: "mindlock: the multiverse code",
    eventname: "MINDLOCK: THE MULTIVERSE CODE",
    category: "Informals",
    description: `"
                MindLock: The Multiverse Code is a team-based memory and
                coordination game designed to test participants' strategic
                thinking, communication, and mental agility. Teams must
                complete short parallel challenges to unlock password-
                protected mobile phones. Each unlocked phone leads to the
                next level. The objective of the game is to unlock the
                maximum number of phones within the given time.
    "`,
    image: "",
    rules: (
      <>
        <div
          className="space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-3xl">
              PARTICIPATION GUIDELINES:
            </span>
            1. The event is open to all students of the institute. <br />
            2. Participants must register only in teams. <br />
            3. Each team must consist of exactly four members. <br />
            4. Solo participation is not allowed. <br />
            5. Cross-year teams are allowed unless stated otherwise. <br />
            6. Once registered, team members cannot be changed.
          </p>
        </div>

        <div
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-3xl">
              TASK & PASSWORD MECHANISM
            </span>
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            1. At the start of each level, teams will be given four different tasks.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            2. Teams must assign one task to each member before the level begins.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            3. Each successfully completed task provides one password digit along with its correct position.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            4. Writing down digits or their positions is not allowed unless explicitly permitted.
          </p>
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            5. After completing all tasks, the team may attempt to unlock the phone.
          </p>
        </div>

        <div
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-3xl">
              RULES & REGULATIONS:
            </span>
            <div className="pl-5">
              GENERAL RULES
              <div className="pl-5">
                1. Participants must carry their college ID cards. <br />
                2. Instructionsgiven by coordinators and volunteers must be followed at all times. <br />
                3. Any form of cheating, misconduct, or indiscipline will lead to disqualification.<br />
                4. Teams must not interfere with other teams or access tasks not assigned to them.
              </div>
              <br />
              GAME-SPECIFIC RULES
              <div className="pl-5">
                1. Personal mobile phones are not allowed. <br />
                2. Task swapping during a level is not permitted. <br />
                3. Communication is allowed unless restricted in a particular level. <br />
                4. Excessive wrong attempts may lead to penalties.<br />
                5.  Tampering with event materials will result in immediate disqualification.
              </div>
            </div>
          </p>
        </div>

        <div
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-3xl">
              SCORING AND RANKING<br />
            </span>
            1. Teams will be ranked based on the number of phones unlocked. <br />
            2. Total time taken will be considered next. <br />
            3. In case of a tie, fewer wrong attempts will be used as the tie-breaker. <br />
          </p>
        </div>

        <div
          className="mt-4 space-y-2 rounded-md border-2 p-4 transition-all duration-300 "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <p className="font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl">
            <span className="font-Piedra text-3xl">
              DISQUALIFICATION CRITERIA<br />
            </span>
            Teams may be disqualified for violating rules, using unfair means, showing disrespect toward organizers, or interfering with other teams.
          </p>
        </div>


        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            PRIZE MONEY :{" "}
          </span>{" "}
          Rs 14,000.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            VENUE:{" "}
          </span>{" "}
          Downs Ground.
        </p>
        <p
          className="mt-2 rounded-lg border-2 p-2 font-serif text-[14px] text-white drop-shadow-[0_0_3px_black] dark:text-white sm:text-3xl lg:text-3xl"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <span className="font-Piedra" style={{ letterSpacing: "2px" }}>
            Contact :{" "}
          </span>{" "}
          Subham Panigrahi (8260343089)
        </p>
      </>
    ),
  },
];
