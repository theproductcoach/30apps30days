import { BlogPost, BookingRequest, Question, ClimbLog, Climb, ClimbSession } from '@/types';

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Local storage keys
const STORAGE_KEYS = {
  BLOG_POSTS: 'climber_coach_blog_posts',
  BOOKING_REQUESTS: 'climber_coach_booking_requests',
  QUESTIONS: 'climber_coach_questions',
  CLIMB_LOGS: 'climber_coach_climb_logs',
};

// Initial blog posts
const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Essential Climbing Techniques for Beginners',
    content: `# Essential Climbing Techniques for Beginners

Climbing is a complex sport that requires both physical strength and technical skill. Here are some fundamental techniques every beginner should master:

## Footwork
- **Keep your feet quiet and precise**: Practice placing your feet silently on holds. This helps in maintaining balance and conserving energy.
- **Use the edges of your climbing shoes**: The edges provide better grip and control. Practice edging on different surfaces to improve your technique.
- **Maintain three points of contact when possible**: This ensures stability. Always try to have two hands and one foot or two feet and one hand on the wall.

## Body Position
- **Keep your hips close to the wall**: This reduces the strain on your arms and helps in maintaining balance. Practice hip movements to get comfortable.
- **Use your legs to push up rather than pulling with your arms**: Your legs are stronger than your arms. Focus on leg strength exercises to improve this technique.
- **Maintain a straight arm when possible to conserve energy**: Bent arms tire quickly. Practice keeping your arms straight while climbing to build endurance.

## Hand Positions
- **Crimp**: For small holds, use your fingertips. Be cautious as this can strain your fingers.
- **Open hand**: For larger holds, use an open grip. This is less stressful on your fingers.
- **Sloper**: For rounded holds, use your palm and fingers. Practice sloper holds to improve grip strength.
- **Pinch**: For holds you can squeeze, use your thumb and fingers. Pinch strength is crucial for certain routes.

## Practice and Progression
- **Regular practice**: Consistency is key. Set a regular climbing schedule to practice these techniques.
- **Focus on basics**: Master these fundamental techniques before moving to advanced ones.
- **Seek feedback**: Climb with experienced climbers and ask for feedback on your technique.

Remember, practice makes perfect. Focus on these basics before moving to more advanced techniques.`,
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
  },
  {
    id: '2',
    title: 'Training for Climbing: A Comprehensive Guide',
    content: `# Training for Climbing: A Comprehensive Guide

Effective training is crucial for improving your climbing abilities. Here's a structured approach:

## Strength Training
- **Pull-ups and variations**: Essential for upper body strength. Include different grips to target various muscles.
- **Core exercises**: A strong core stabilizes your body. Incorporate planks, leg raises, and Russian twists.
- **Finger strength exercises**: Use hang boards and fingerboards to build finger strength gradually.
- **Antagonist training**: Balance your muscles by training opposing muscle groups to prevent injuries.

## Endurance
- **ARC training**: Aerobic Restoration and Capillarity training improves endurance. Climb continuously at a low intensity.
- **4x4s**: Perform four sets of four climbs with minimal rest. This builds power endurance.
- **Circuit training**: Combine climbing with other exercises like burpees and push-ups for overall endurance.

## Technique
- **Limit bouldering**: Focus on difficult problems to improve strength and technique.
- **Project climbing**: Work on challenging routes to develop problem-solving skills.
- **Movement drills**: Practice specific movements repeatedly to build muscle memory.

## Recovery and Rest
- **Adequate rest**: Allow muscles to recover. Overtraining can lead to injuries.
- **Listen to your body**: Pay attention to signs of fatigue and adjust your training accordingly.

Remember to rest adequately between sessions and listen to your body.`,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
  {
    id: '3',
    title: 'Mental Training for Climbing',
    content: `# Mental Training for Climbing

Climbing is as much a mental game as it is physical. Here are key mental strategies:

## Visualization
- **Picture yourself completing the route**: Visualize each move to build confidence.
- **Break down complex moves**: Analyze difficult sections and visualize solutions.
- **Visualize success**: Imagine the feeling of completing the climb to boost motivation.

## Breathing Techniques
- **Deep breathing for relaxation**: Use deep breaths to calm nerves before a climb.
- **Rhythmic breathing during climbing**: Maintain a steady breathing pattern to stay focused.
- **Recovery breathing between attempts**: Use controlled breathing to recover quickly.

## Managing Fear
- **Progressive exposure**: Gradually increase exposure to challenging situations.
- **Positive self-talk**: Replace negative thoughts with encouraging words.
- **Focus on the present moment**: Concentrate on the current move rather than the entire route.

## Building Mental Resilience
- **Practice under pressure**: Simulate competition conditions to build mental toughness.
- **Reflect on experiences**: Analyze past climbs to learn and improve.

Remember, mental strength comes with practice and experience.`,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
  {
    id: '4',
    title: 'Advanced Climbing Techniques',
    content: `# Advanced Climbing Techniques

Mastering advanced techniques can significantly improve your climbing performance. Here are some techniques to focus on:

## Dynamic Movements
- **Dynos**: Explosive movements to reach distant holds. Practice timing and coordination.
- **Deadpoints**: Controlled dynamic moves to minimize swing. Focus on precision and control.

## Footwork
- **Heel Hooks**: Use your heel to pull on holds. Strengthen your hamstrings and practice balance.
- **Toe Hooks**: Engage your toes to pull or stabilize. Develop flexibility and foot strength.

## Body Positioning
- **Flagging**: Extend a leg to counterbalance. Practice on overhangs and slabs.
- **Drop Knees**: Rotate your knee inward to lower your center of gravity. Useful on steep routes.

## Mental Strategies
- **Visualization**: Picture complex sequences before attempting them.
- **Focus**: Concentrate on each move, blocking out distractions.

Remember, advanced techniques require practice and patience. Incorporate them into your training sessions regularly.`,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: '5',
    title: 'Nutrition for Climbers',
    content: `# Nutrition for Climbers

Proper nutrition is crucial for climbing performance and recovery. Here's a guide to fueling your body:

## Macronutrients
- **Carbohydrates**: Primary energy source. Focus on complex carbs like whole grains and vegetables.
- **Proteins**: Essential for muscle repair. Include lean meats, beans, and nuts in your diet.
- **Fats**: Important for long-term energy. Opt for healthy fats like avocados and olive oil.

## Hydration
- **Water**: Stay hydrated to maintain performance. Drink regularly throughout the day.
- **Electrolytes**: Replenish lost salts during intense sessions. Consider sports drinks or electrolyte tablets.

## Meal Timing
- **Pre-Climb**: Eat a balanced meal 2-3 hours before climbing. Include carbs and proteins.
- **Post-Climb**: Refuel with a protein-rich meal to aid recovery.

## Supplements
- **Vitamins and Minerals**: Ensure adequate intake of essential nutrients.
- **Protein Supplements**: Consider protein shakes if dietary intake is insufficient.

Tailor your nutrition plan to your individual needs and climbing goals. Consult a nutritionist for personalized advice.`,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: '6',
    title: 'Climbing Gear Essentials',
    content: `# Climbing Gear Essentials

Having the right gear is essential for safety and performance. Here's a list of must-have climbing equipment:

## Climbing Shoes
- **Fit**: Ensure a snug fit for precision. Try different brands to find the best fit.
- **Type**: Choose shoes based on climbing style (e.g., aggressive for bouldering).

## Harness
- **Comfort**: Look for padded leg loops and waistbelt.
- **Features**: Consider gear loops and adjustability.

## Belay Device
- **Types**: Choose between tubular, assisted-braking, or figure-eight devices.
- **Compatibility**: Ensure it works with your rope diameter.

## Helmet
- **Protection**: Essential for outdoor climbing. Check for a secure fit and ventilation.

## Chalk and Chalk Bag
- **Grip**: Use chalk to improve grip. Choose between loose chalk or chalk balls.
- **Bag**: Look for a bag with a secure closure and brush holder.

Invest in quality gear and maintain it regularly. Proper equipment enhances safety and climbing experience.`,
    created_at: new Date(Date.now()).toISOString(), // Today
  },
  {
    id: '7',
    title: 'Injury Prevention and Recovery',
    content: `# Injury Prevention and Recovery

Preventing injuries is crucial for long-term climbing success. Here's how to stay healthy and recover effectively:

## Warm-Up
- **Dynamic Stretching**: Prepare your muscles with active movements.
- **Specific Exercises**: Focus on areas prone to injury, like fingers and shoulders.

## Technique
- **Proper Form**: Use correct techniques to reduce strain.
- **Rest**: Allow adequate recovery time between sessions.

## Recovery
- **Ice and Compression**: Use for acute injuries to reduce swelling.
- **Physical Therapy**: Consult a therapist for rehabilitation exercises.

## Nutrition
- **Anti-Inflammatory Foods**: Include foods like berries and fish to reduce inflammation.
- **Hydration**: Maintain fluid balance to support recovery.

Listen to your body and address injuries promptly. Consistent care prevents long-term issues.`,
    created_at: new Date(Date.now()).toISOString(), // Today
  },
  {
    id: '8',
    title: 'Climbing in Different Environments',
    content: `# Climbing in Different Environments

Each climbing environment presents unique challenges. Here's how to adapt:

## Indoor Climbing
- **Routesetting**: Familiarize yourself with gym routes and holds.
- **Training**: Use indoor facilities for focused training sessions.

## Outdoor Climbing
- **Weather**: Check conditions and plan accordingly.
- **Leave No Trace**: Follow ethical practices to preserve nature.

## Bouldering
- **Crash Pads**: Use multiple pads for protection.
- **Spotting**: Ensure proper spotting techniques for safety.

## Trad Climbing
- **Gear Placement**: Practice placing protection securely.
- **Route Finding**: Develop skills to navigate natural features.

Adapt your skills and gear to the environment. Each setting offers unique opportunities for growth.`,
    created_at: new Date(Date.now()).toISOString(), // Today
  },
  {
    id: '9',
    title: 'The History of Climbing',
    content: `# The History of Climbing

Climbing has a rich history that has shaped the sport today. Here's an overview:

## Early Beginnings
- **Mountaineering**: Originated as a means to explore and conquer peaks.
- **Rock Climbing**: Evolved as a distinct discipline in the late 19th century.

## Key Developments
- **Equipment**: Innovations like carabiners and harnesses revolutionized safety.
- **Techniques**: The development of techniques like free climbing expanded possibilities.

## Modern Era
- **Competitions**: Climbing became a competitive sport with events worldwide.
- **Olympics**: Included in the 2020 Tokyo Olympics, gaining global recognition.

## Cultural Impact
- **Media**: Films and documentaries have popularized climbing.
- **Community**: A vibrant community of climbers shares a passion for adventure.

Understanding climbing's history enriches appreciation for the sport. It continues to evolve, inspiring new generations.`,
    created_at: new Date(Date.now()).toISOString(), // Today
  },
];

// Helper functions to get and set data from localStorage
const getData = <T>(key: string): T[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const setData = <T>(key: string, data: T[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
};

// Initialize data if empty
const initializeData = () => {
  if (typeof window === 'undefined') return;
  
  const blogPosts = localStorage.getItem(STORAGE_KEYS.BLOG_POSTS);
  if (!blogPosts) {
    localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(INITIAL_BLOG_POSTS));
  }
};

// Call initializeData when the module loads
initializeData();

// Blog Posts
export const getBlogPosts = (): BlogPost[] => {
  initializeData(); // Call initialization before getting posts
  return getData(STORAGE_KEYS.BLOG_POSTS);
};
export const addBlogPost = (post: Omit<BlogPost, 'id' | 'created_at'>): BlogPost => {
  const posts = getBlogPosts();
  const newPost: BlogPost = {
    ...post,
    id: generateId(),
    created_at: new Date().toISOString(),
  };
  setData(STORAGE_KEYS.BLOG_POSTS, [...posts, newPost]);
  return newPost;
};

// Booking Requests
export const getBookingRequests = (): BookingRequest[] => getData(STORAGE_KEYS.BOOKING_REQUESTS);
export const addBookingRequest = (request: Omit<BookingRequest, 'id' | 'created_at' | 'status'>): BookingRequest => {
  const requests = getBookingRequests();
  const newRequest: BookingRequest = {
    ...request,
    id: generateId(),
    created_at: new Date().toISOString(),
    status: 'pending',
  };
  setData(STORAGE_KEYS.BOOKING_REQUESTS, [...requests, newRequest]);
  return newRequest;
};

// Questions
export const getQuestions = (): Question[] => getData(STORAGE_KEYS.QUESTIONS);
export const addQuestion = (question: Omit<Question, 'id' | 'created_at'>): Question => {
  const questions = getQuestions();
  const newQuestion: Question = {
    ...question,
    id: generateId(),
    created_at: new Date().toISOString(),
  };
  setData(STORAGE_KEYS.QUESTIONS, [...questions, newQuestion]);
  return newQuestion;
};
export const updateQuestionAnswer = (id: string, answer: string): Question | null => {
  const questions = getQuestions();
  const updatedQuestions = questions.map(q => 
    q.id === id 
      ? { ...q, answer, updated_at: new Date().toISOString() }
      : q
  );
  setData(STORAGE_KEYS.QUESTIONS, updatedQuestions);
  return updatedQuestions.find(q => q.id === id) || null;
};

// Climb Logs
export const getClimbLogs = (): ClimbLog[] => getData(STORAGE_KEYS.CLIMB_LOGS);
export const addClimbLog = (log: Omit<ClimbLog, 'id' | 'created_at'>): ClimbLog => {
  const logs = getClimbLogs();
  const newLog: ClimbLog = {
    ...log,
    id: generateId(),
    created_at: new Date().toISOString(),
  };
  setData(STORAGE_KEYS.CLIMB_LOGS, [...logs, newLog]);
  return newLog;
}; 