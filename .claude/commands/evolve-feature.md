# EVOLVE FEATURE COMMAND

Think very hard about this continuous feature evolution task and do some web research for relevant documentation and best practice guidelines or high quality examples. Decide based on the task how to gather the best and right amount of context in the web or with you documentation retrieval tools. You are about to orchestrate sophisticated iterative improvements to transform a feature from its current state to an innovative future vision. At strategic points you or the subagents are allowed to do more web research if exploring new ideas or concepts.

## Variables

prd_file: $ARGUMENTS
target_feature: $ARGUMENTS
iteration_count: $ARGUMENTS
evolution_mode: $ARGUMENTS (optional, default: "balanced")

## Arguments Parsing:

Parse the following arguments from "$ARGUMENTS":

1. `prd_file` - Path to the PRD/vision document describing desired state
2. `target_feature` - Feature name or file pattern to evolve (e.g., "auth system", "src/components/Dashboard")
3. `iteration_count` - Number of evolution cycles (1-N or "infinite")
4. `evolution_mode` - Focus area: "performance", "ux", "architecture", "balanced"

## PHASE 1: PLANNING MODE - DEEP FEATURE ANALYSIS

Think very hard about the current state and future possibilities.

### Current State Discovery

Analyze the target feature comprehensively:

- Locate all files implementing the feature
- Understand current architecture and design patterns
- Identify technical debt and limitations
- Map dependencies and integration points
- Assess performance characteristics
- Document user experience pain points

### Vision Analysis

Study the PRD to extract:

- Desired end state and capabilities
- Quality attributes (performance, scalability, usability)
- Innovation opportunities not explicitly stated
- Constraints and non-negotiables
- Success metrics and acceptance criteria

### Evolution Strategy

Think harder about the transformation path:

- What are the riskiest changes?
- Which improvements unlock others?
- How to maintain stability during evolution?
- Where can we innovate beyond the PRD?
- What's the optimal sequence of changes?

## PHASE 2: ITERATION PLANNING

### Wave-Based Evolution Model

Unlike TDD's emergent complexity, we'll use deliberate waves:

**Wave 1 - Foundation (Iterations 1-3)**

- Clean up technical debt
- Improve code organization
- Enhance error handling
- Optimize obvious bottlenecks
- 3-5 parallel agents per iteration

**Wave 2 - Enhancement (Iterations 4-7)**

- Implement PRD requirements
- Improve user experience
- Add instrumentation/observability
- Enhance performance
- 5-7 parallel agents per iteration

**Wave 3 - Innovation (Iterations 8-12)**

- Explore novel approaches
- Push beyond PRD vision
- Experiment with cutting-edge patterns
- Optimize for future scale
- 7-10 parallel agents per iteration

**Wave 4 - Refinement (Iterations 13+)**

- Polish implementation details
- Maximize performance
- Perfect error messages
- Document architectural decisions
- 3-5 specialized agents per iteration

### Dynamic Wave Adjustment

Waves adapt based on feature complexity:

```
if (feature_size == "small"):
    compress_waves(factor=0.5)
elif (feature_complexity == "critical"):
    extend_waves(factor=1.5)
    add_stability_iterations()
```

## PHASE 3: PARALLEL AGENT ORCHESTRATION

### Agent Specialization Strategy

Deploy diverse agents for comprehensive evolution. Make sure to give the agents the right context as well as the location of the base and evolving prd files:

**Architecture Innovator**

```
TASK: Evolve [FEATURE] architecture - Iteration [N]

Current architecture: [Summary]
PRD vision: [Key points]
Previous improvements: [List]

Propose architectural improvements that:
1. Move toward PRD vision
2. Introduce innovative patterns
3. Improve maintainability
4. Enable future features
5. Consider cutting-edge approaches
```

**Performance Optimizer**

```
TASK: Optimize [FEATURE] performance - Iteration [N]

Current metrics: [Benchmarks]
Target metrics: [PRD goals]
Bottlenecks identified: [List]

Deliver optimizations that:
1. Reduce latency/resource usage
2. Improve scalability
3. Maintain code clarity
4. Document performance gains
5. Think beyond conventional solutions
```

**UX Enhancer**

```
TASK: Enhance [FEATURE] user experience - Iteration [N]

Current UX: [Pain points]
PRD vision: [UX goals]
User feedback: [If available]

Implement improvements that:
1. Simplify user workflows
2. Improve error messaging
3. Enhance responsiveness
4. Add delightful touches
5. Anticipate user needs
```

**Code Quality Guardian**

```
TASK: Refine [FEATURE] code quality - Iteration [N]

Code smells detected: [List]
Maintainability issues: [List]
Test coverage: [Current %]

Improvements should:
1. Enhance readability
2. Reduce complexity
3. Improve testability
4. Follow best practices
5. Enable future evolution
```

### Innovation Catalyst Agents (Wave 3+)

**Future-Proofer**

- Anticipate next 2 years of requirements
- Implement extensibility hooks
- Design for 10x scale

**Cross-Pollinator**

- Import patterns from other domains
- Suggest unconventional approaches
- Challenge assumptions

## PHASE 4: IMPLEMENTATION COORDINATION

### Smart Parallelization Strategy

Think very carefully about how to parallelize agent work without creating conflicts or race conditions.

#### Parallelization Risk Assessment

Before deploying parallel agents, analyze:

```
1. File Overlap Risk
   - HIGH: Multiple agents editing same file
   - MEDIUM: Agents editing related/imported files
   - LOW: Agents working on independent modules

2. State Dependency Risk
   - HIGH: Shared state managers, global configs
   - MEDIUM: Component hierarchies, API contracts
   - LOW: Isolated features, documentation

3. Visual Impact Risk
   - HIGH: Layout changes, global styles
   - MEDIUM: Component-specific styles
   - LOW: Backend logic, utilities
```

#### Parallelization Patterns

**Pattern 1: Sequential Critical Path**
When agents MUST modify the same files:

```
1. Establish clear execution order
2. First agent completes and commits
3. Next agent pulls changes before starting
4. Use visual testing between each agent
```

**Pattern 2: Git Worktree Isolation**
For risky parallel work:

```bash
# Create isolated worktrees for each agent
git worktree add -b agent-1-branch ../worktree-agent-1
git worktree add -b agent-2-branch ../worktree-agent-2

# Each agent works in isolation
# Merge strategically after completion
```

**Pattern 3: File-Based Partitioning**
Assign exclusive file ownership:

```
Agent 1: src/components/CardGrid.jsx (exclusive)
Agent 2: src/components/DeckPanel.jsx (exclusive)
Agent 3: src/lib/stores/* (exclusive)
Coordinator: src/App.jsx (after all agents)
```

**Pattern 4: Layer-Based Parallelization**
Work on different application layers:

```
Visual Agent: UI components, styles
State Agent: State management, data flow
Performance Agent: Utilities, algorithms
Testing Agent: Tests, documentation
```

#### Pre-Parallelization Checklist

Think through these questions BEFORE deploying parallel agents:

1. **Baseline State**

   - Is there a working baseline to revert to?
   - Have we captured visual screenshots?
   - Is the current state stable?

2. **Dependency Mapping**

   - Which files import which other files?
   - What are the state dependencies?
   - Where are the API boundaries?

3. **Conflict Prediction**

   - Which agents might edit the same files?
   - What order makes most sense?
   - Can we use worktrees to isolate risky work?

4. **Integration Strategy**
   - How will we merge parallel work?
   - Who validates the integrated result?
   - What's our rollback plan?

#### Smart Agent Instructions

Include these parallelization guidelines in EVERY agent prompt:

```
PARALLELIZATION RULES:
1. List ALL files you plan to modify at the start
2. Check if another agent is assigned those files
3. If conflict detected, propose alternative approach
4. Take "before" screenshots if modifying UI
5. Test your changes in isolation before marking complete
6. Document any API/contract changes for other agents
```

#### Conflict Resolution Strategies

**Strategy 1: Optimistic Locking**

```
1. Agent attempts to edit file
2. If file changed since agent started, agent re-reads
3. Agent adapts changes to new state
4. Maximum 3 retry attempts
```

**Strategy 2: Coordinated Handoff**

```
1. Agent A completes src/Component.jsx
2. Signals completion to coordinator
3. Agent B waits for signal before starting
4. Clear ownership transfer
```

**Strategy 3: Semantic Merging**

```
1. Both agents describe intended changes
2. Coordinator creates unified change plan
3. Single implementation agent executes
4. Both agents verify result
```

### Visual Testing Coordination

For UI changes, enforce visual testing discipline:

```
1. BEFORE any agent starts:
   - Capture baseline screenshots
   - Document current behavior

2. DURING parallel work:
   - Each agent captures their changes
   - Screenshots saved to agent-specific folders

3. AFTER integration:
   - Capture final state
   - Compare to baseline
   - Verify no regressions
```

### Change Synchronization Protocol

```
Before iteration N:
1. Analyze file dependencies and overlap risks
2. Choose appropriate parallelization pattern
3. Consider using git worktrees for high-risk parallel work
4. Assign clear file ownership or use sequential execution
5. Deploy agents with explicit parallelization instructions
6. Monitor for conflicts and adapt strategy as needed
7. Integration agent verifies combined result with visual tests
```

## PHASE 5: EVOLUTION METRICS

### Progress Tracking

Track evolution across dimensions:

- **Functionality**: % of PRD requirements implemented
- **Performance**: Improvement over baseline
- **Innovation**: Novel features beyond PRD
- **Quality**: Code metrics trajectory
- **Stability**: Error rate changes

### Iteration Decision Logic

```
if (iteration < wave_threshold):
    continue_current_wave()
elif (metrics_plateaued()):
    advance_to_next_wave()
elif (innovation_breakthrough()):
    explore_deeper()
else:
    assess_completion()
```

## PHASE 6: EVOLUTION DOCUMENTATION

### Living PRD Creation

Initialize an evolution PRD at start:

```
Filename: [feature]_evolution_prd.md
Location: Same directory as original PRD
Purpose: Document the feature's transformation journey
```

### Documentation Structure

```markdown
# [FEATURE] Evolution PRD

## Original Vision

[Summary of original PRD goals]

## Evolution History

### Iteration N - [Wave Name]

**Date**: [Timestamp]
**Focus**: [Architecture/Performance/UX/Innovation]

**Changes Implemented**:

- [Change 1]: [Rationale and impact]
- [Change 2]: [Rationale and impact]

**Innovations Beyond Original PRD**:

- [Innovation 1]: [Why this improves the feature]
- [Innovation 2]: [User benefit]

**Metrics**:

- Performance: [Before] → [After]
- Code Quality: [Improvements]
- User Experience: [Enhancements]

**Key Decisions**:

- [Decision]: [Reasoning]

**Next Opportunities**:

- [Identified improvement for future iteration]
```

### Documentation Agent Task

Deploy a Documentation Curator after each iteration:

```
TASK: Document iteration [N] evolution

Changes made: [List from all agents]
Metrics collected: [Performance, quality, etc.]
Innovations introduced: [Beyond PRD scope]

Create clear documentation that:
1. Captures all improvements
2. Explains reasoning
3. Shows measurable impact
4. Highlights innovations
5. Guides future iterations
```

### Documentation Principles

- **Clarity**: Future developers should understand why
- **Metrics**: Quantify improvements where possible
- **Innovation**: Celebrate going beyond requirements
- **Learning**: Capture what didn't work and why
- **Vision**: Show how feature is evolving

## PHASE 7: INFINITE MODE CONSIDERATIONS

### Sustainable Evolution

For infinite mode, maintain momentum:

1. **Context Rotation**: Summarize older iterations
2. **Achievement Logging**: Track all improvements in evolution PRD
3. **Breakthrough Detection**: Flag major innovations
4. **Diminishing Returns**: Recognize natural completion
5. **Graceful Conclusion**: Final PRD shows complete transformation

## EXECUTION PRINCIPLES

### Innovation Over Compliance

- PRD is inspiration, not limitation
- Question assumptions
- Propose better solutions
- Justify departures clearly
- Delight users unexpectedly

### Evolution Over Revolution

- Maintain working software
- Incremental improvements
- Test critical paths
- Document breaking changes
- Preserve core functionality

### Collaboration Over Isolation

- Agents build on each other
- Share discovered patterns
- Communicate breakthroughs
- Integrate smoothly
- Amplify good ideas

### Learning Over Repetition

- Each iteration learns from previous
- Patterns emerge and propagate
- Failed experiments inform future
- Success patterns get refined
- Knowledge compounds

## PARALLELIZATION WISDOM

### Learning from Experience

Think deeply about these parallelization lessons:

**Common Pitfalls to Avoid**

1. **The Eager Baseline Problem**
   - Agents starting work before baseline is captured
   - Solution: Always run baseline agent ALONE first
2. **The Moving Target Problem**
   - UI changing while trying to screenshot it
   - Solution: Sequential execution for visual testing
3. **The Import Chain Problem**
   - Agent A changes an export, breaking Agent B's import
   - Solution: Map dependencies before parallelizing
4. **The Style Cascade Problem**
   - Global style changes affecting all components
   - Solution: Isolate style changes to final phase

**Successful Patterns**

1. **The Preparation Phase**
   - Single agent establishes stable foundation
   - All parallel agents build on stable base
2. **The Worktree Strategy**
   - High-risk changes in isolated branches
   - Clean merges after individual success
3. **The Layer Strategy**
   - UI agents work on components
   - Logic agents work on state/utils
   - Style agents work on themes
4. **The Handoff Protocol**
   - Clear ownership boundaries
   - Explicit completion signals
   - No assumption of timing

**Decision Framework**
Before parallelizing, ask:

```
1. Can these changes conflict? → Use sequential
2. Do they share files? → Use worktrees
3. Are they independent? → Safe to parallelize
4. Is visual testing needed? → Coordinate carefully
```

## ULTRA-THINKING DIRECTIVE

Before beginning evolution, think very hard about:

### Feature Destiny

**Think deeper than the PRD**

- What does this feature want to become?
- What would make users love it?
- How might needs evolve?
- What would the ideal implementation look like?
- Where can we exceed expectations?

### Innovation Opportunities

**Think beyond conventional approaches**

- What patterns from other domains apply?
- How would a 10x engineer approach this?
- What recent innovations could we leverage?
- Where can we add unexpected delight?
- What would make this feature memorable?

### Evolution Orchestration

**Think about parallel potential**

- How can agents amplify each other?
- What combinations yield breakthroughs?
- How to maintain coherent vision?
- When to diverge vs converge?
- How to recognize true innovation?

### Sustainable Progress

**Think about long-term impact**

- What changes enable future evolution?
- How to keep code malleable?
- When is "good enough" actually best?
- How to document tribal knowledge?
- What legacy are we creating?

## NATURAL LANGUAGE MODE TRIGGERS

### Deep Analysis Mode

"Think very hard about this feature's potential"

- Triggers extended analysis
- Considers non-obvious improvements
- Questions fundamental assumptions

### Innovation Mode

"Think beyond the PRD requirements"

- Encourages creative solutions
- Explores cutting-edge patterns
- Proposes delightful additions

### Integration Planning

"Think harder about how these changes work together"

- Analyzes agent proposals holistically
- Identifies synergies and conflicts
- Plans smooth integration

### Progress Assessment

"Think deeply about our evolution progress"

- Reviews metrics comprehensively
- Identifies breakthrough moments
- Decides wave transitions

Begin by understanding the feature's current state and envisioning its transformed future. Let parallel innovation and thoughtful evolution guide the feature toward excellence.
