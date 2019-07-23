# tsneVisualization
This is a 2D/3D visualization of t-Distributed Stochastic Neighbor Embedding (t-SNE) using ThreeJS. The colors are used to display different labels of each sample. As experiment, MNIST dataset is used with 784 features. As a start, only 1000 samples are used.

To see the visualization use the link: https://wedadanbtawi95.github.io/tsneVisualization/

For t-SNE computation, the main web-page thread is using a web worker to avoid the page freezing risk.

User can upload any csv file with first column as labels and the rest of columns numeric features and run tsne on it.

Still to-do:

Add labels'annotation so on point click it will show its label.
Make the t-SNE computation in the cloud.
