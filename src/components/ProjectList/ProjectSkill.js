function ProjectSkill({ skill }) {
    return (
        <>
            <span className='badge rounded-pill bg-primary text-white me-2 text-capitalize'>
                {skill.skillName}{" "}
                <span>
                    ({skill.foundCount} / {skill.requiredCount})
                </span>
            </span>
        </>
    );
}

export default ProjectSkill;
